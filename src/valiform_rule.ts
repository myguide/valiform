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

class ValiformRule
{
    /**
     * @var any The input element within the form
     * @var string The key of the rule to be applied
     * @var any The value of the rule to be applied
     */
    private inputElement: any;
    public rule: string;
    public value: any;

    /**
     * constructor gives all properties of this class a default value, passed
     * through once instanciated.
     *
     * @param any The form input element
     * @param string The key of the rule
     * @param any The value of the rule
     *
     * @return void
     */
    constructor(inputElement: any, rule: string, value: any)
    {
        this.inputElement = inputElement;
        this.rule = rule;
        this.value = value;
    }

    /**
     * validate check the rule by its key and calls the method that matches with
     * that key.
     *
     * @return boolean
     */
    public validate(): boolean {
        switch (this.rule) {
            case "required":
                return this.required(this.value);
                break;
            default:
                return true;
                break;
        }
        return false;
    }

    /**
     * requird is a rule that verifies if a field has any input in it at all
     *
     * @param boolean The rule value
     *
     * @return boolean
     */
    private required(is: boolean): boolean
    {
        if (this.inputElement.value === "" && is === true) {
            // Add error message to an array
            return false;
        }
        return true;
    }

    private isEmail(is: string)
    {
        
    }
}
