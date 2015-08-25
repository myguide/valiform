/**
 * Valiform v0.0.1
 *
 * (c) myguide.io 2015
 *
 * @package Valiform
 * @version 0.0.1
 *
 * @author Harry Lawrence <http://github.com/hazbo>
 *
 * License: MIT
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Valiform
{
    /**
     * @var any The form with inputs to validate
     * @var boolean The status of errors existing or not
     * @var string[] List of error messages
     * @var number The number of form errors generates
     */
    private formElement: any;
    private status: boolean;
    private errors: string[];
    private errorCount: number;

    /**
     * @var any An input element to be validated
     * @var any Options to be passed through as rules
     */
    public formInput: any;
    public options: any;

    /**
     * constructor assigns default values to the relevant properties for the
     * form and all the the elements to be validated. Callback functions to be
     * fired are also set here for event attached to the form validation.
     *
     * @return void
     */
    constructor()
    {
        this.formElement = null;
        this.formInput = null;
        this.status = true;
        this.errors = [];
        this.errorCount = 0;
        this.options = null;
    }

    /**
     * form gets the form element, as validation will not fire if this element
     * cannot be found.
     *
     * @param string the ID of the form
     *
     * @return Valiform
     */
    public form(name: string): Valiform
    {
        this.formElement = document.getElementById(name);
        return this;
    }

    /**
     * input gets an input field by its ID and assigns it to Valiform.formInput
     * given that formElement is not null.
     *
     * @param string the ID of the input field
     *
     * @return Valiform
     */
    public input(name: string): Valiform
    {
        if (this.formElement !== null) {
            this.formInput = document.getElementById(name);
        }
        return this;
    }

    /**
     * rules gets the options passed to the public method and defaults to the
     * fact that it wasn't fired by a watch event. If a watch event fires, it
     * event will == true.
     *
     * @param any The options object to be passed through
     * @param boolean The watch event flag
     *
     * @return Valiform
     */
    public rules(options: any, event = false): Valiform
    {
        this.options = options;

        if (this.formInput !== null && event === true) {
            this.applyRules();
        }
        return this;
    }

    /**
     * watch is an optional method that can be attached to an input to check for
     * changes. By default it assumes the input is some sort of text input. This
     * will change so that it can handle checkboxes, radios, buttons etc...
     *
     * @return Valiform
     */
    public watch(): Valiform
    {
        var watcher: ValiformWatcher = new ValiformWatcher();
        watcher.watch(this);
        return this;
    }

    /**
     * getStatus gets the current success status based on the fields Valiform is
     * is currently attached to.
     *
     * @return boolean
     */
    public getStatus(): boolean
    {
        return this.status;
    }

    /**
     * applyRules applies the rules for any given element. This is fired under
     * the conditions of the onLoad or event flag. If a watcher is in place,
     * this will be fired on every event it listens for.
     *
     * @return void
     */
    private applyRules(): void
    {
        var rule: any;
        var success: () => void = null;
        var error: (e: any) => void = null;

        for (var key in this.options) {
            rule = new ValiformRule(this.formInput, key, this.options[key]);
            if (rule.rule === "success") {success = rule.value;}
            if (rule.rule === "error") {error = rule.value;}

            if (rule.validate() !== true) {
                this.errorCount++;
            }
        }

        if (this.errorCount > 0) {
            if (error !== null) {
                this.status == false;
                error(this.errors);
                this.errorCount = 0;
            }
            return null;
        }

        if (success !== null) {
            this.status = true;
            success();
        }

        this.errorCount = 0;
        return null;
    }
}

this.Valiform = new Valiform();
