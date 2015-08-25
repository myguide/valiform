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
     * @var any formElement The form with inputs to validate
     * @var any formInput An input element to be validated
     * @var boolean The status of errors existing or not
     * @var string[] List of error messages
     * @var any Options to be passed through as rules
     * @var boolean Whether or not to fire validation on load
     * @var () => void Method to fire on form success
     * @var (e: string[]) => void Method to fire when form fails
     */
    private formElement: any;
    private formInput: any;
    private status: boolean;
    private errors: string[];
    private errorCount: number;
    private options: any;
    private onLoadValue: boolean;
    private onSuccessMethod: () => void
    private onErrorMethod: (e: string[]) => void

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
        this.onLoadValue = false;
        this.onSuccessMethod = function(){};
        this.onErrorMethod = function(e: any){};
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
     * event will == true. This way we can choose whether or not to fire rules
     * onLoad.
     *
     * @param any The options object to be passed through
     * @param boolean The watch event flag
     *
     * @return Valiform
     */
    public rules(options: any, event = false): Valiform
    {
        this.options = options;
        if (this.checkForEvent(event) !== true) {
            return this;
        }

        if (this.formInput !== null) {
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
        var valiform = this;
        this.formInput.addEventListener("keyup", function(e: any) {
            valiform.formInput = e.target;
            valiform.rules(valiform.options, true);
        });

        this.formInput.addEventListener("blur", function(e: any) {
            valiform.formInput = e.target;
            valiform.rules(valiform.options, true);
        });
        return this;
    }

    /**
     * onLoad is a public method that allows the user to specify whether or not
     * the validation rules are fired once the form has initially loaded without
     * any user input. By default this is set to false. Something like this
     * could come in handy on a form that is there to edit existing form fields
     *
     * @param boolean The boolean flag to specify whether to fire or not
     *
     * @return Valiform
     */
    public onLoad(is: boolean): Valiform
    {
        this.onLoadValue = is;
        return this;
    }

    /**
     * onSuccess allows the user to speficy a function with zero params to be
     * called once the validation rules have all passed.
     *
     * @param () => void The callback function to be fired
     *
     * @return Valiform
     */
    public onSuccess(callback: () => void): Valiform
    {
        this.onSuccessMethod = callback;
        return this;
    }

    /**
     * onError allows the user to speficy a function with one param to be called
     * if any validation rules have failed.
     *
     * @param (e :string[]) => void The callback function to be fired
     *
     * @return Valiform
     */
    public onError(callback: (e :string[]) => void): Valiform
    {
        this.onErrorMethod = callback;
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
     * checkForEvent checks to see if the onLoadValue is false before deciding
     * whether or not to allow the rules to be applied which Valiform is
     * watching an element.
     *
     * @param boolean The event flag
     *
     * @return boolean
     */
    private checkForEvent(event: boolean): boolean
    {
        if (event === false && this.onLoadValue === false) {
            return false;
        }
        return true;
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
