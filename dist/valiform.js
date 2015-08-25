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
var ValiformWatcher = (function () {
    function ValiformWatcher() {
    }
    ValiformWatcher.prototype.watch = function (valiform) {
        valiform.formInput.addEventListener("keyup", function (e) {
            valiform.formInput = e.target;
            valiform.rules(valiform.options, true);
        });
        valiform.formInput.addEventListener("blur", function (e) {
            valiform.formInput = e.target;
            valiform.rules(valiform.options, true);
        });
        return this;
    };
    return ValiformWatcher;
})();
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
var ValiformRule = (function () {
    function ValiformRule(inputElement, rule, value) {
        this.inputElement = inputElement;
        this.rule = rule;
        this.value = value;
    }
    ValiformRule.prototype.validate = function () {
        switch (this.rule) {
            case "required":
                return this.required(this.value);
                break;
            default:
                return true;
                break;
        }
        return false;
    };
    ValiformRule.prototype.required = function (is) {
        if (this.inputElement.value === "" && is === true) {
            return false;
        }
        return true;
    };
    ValiformRule.prototype.isEmail = function (is) {
    };
    return ValiformRule;
})();
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
var Valiform = (function () {
    function Valiform() {
        this.formElement = null;
        this.formInput = null;
        this.status = true;
        this.errors = [];
        this.errorCount = 0;
        this.options = null;
    }
    Valiform.prototype.form = function (name) {
        this.formElement = document.getElementById(name);
        return this;
    };
    Valiform.prototype.input = function (name) {
        if (this.formElement !== null) {
            this.formInput = document.getElementById(name);
        }
        return this;
    };
    Valiform.prototype.rules = function (options, event) {
        if (event === void 0) { event = false; }
        this.options = options;
        if (this.formInput !== null && event === true) {
            this.applyRules();
        }
        return this;
    };
    Valiform.prototype.watch = function () {
        var watcher = new ValiformWatcher();
        watcher.watch(this);
        return this;
    };
    Valiform.prototype.getStatus = function () {
        return this.status;
    };
    Valiform.prototype.applyRules = function () {
        var rule;
        var success = null;
        var error = null;
        for (var key in this.options) {
            rule = new ValiformRule(this.formInput, key, this.options[key]);
            if (rule.rule === "success") {
                success = rule.value;
            }
            if (rule.rule === "error") {
                error = rule.value;
            }
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
    };
    return Valiform;
})();
this.Valiform = new Valiform();
