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

class ValiformWatcher
{
    constructor()
    {

    }

    watch(valiform: Valiform): ValiformWatcher
    {
        valiform.formInput.addEventListener("keyup", function(e: any) {
            valiform.formInput = e.target;
            valiform.rules(valiform.options, true);
        });

        valiform.formInput.addEventListener("blur", function(e: any) {
            valiform.formInput = e.target;
            valiform.rules(valiform.options, true);
        });

        return this;
    }
}