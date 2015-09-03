require('./style.less')
var Element = require('../../element')
var Property = require('../../property')

Element.prototype.inject(
  require( '../../property/css' ),
  require( '../../property/style' )
)

var Icon = new Element({
  $css: 'font icon',
  $flags: {
    $family: new Property({
      $on: {
        $new: function( event, removed ) {
          var $element = this.$parent
          var $val = this.$val

          $element.set({
            $style: {
              fontFamily: $val
            }
          })
        }
      }
    })
  }
}).$Constructor


/**
 * Icon component, which works with Less to inject `font` icon.
 * @function Icon
 * @param {string} iconName - Name of icon in less file
 * @param {string} [family=vui] - Font family
 * @memberOf Component
 *
 * @example
 * var Icon = require('vui/lib/components/icon')
 * var a = new Icon('sun')
 *
 * @example ```less
 * // less
 * font-face {
 *   font-family: "vui";
 *   src: url('icons/icomoon.eot?ypcv2b');
 *   // ...
 * }
 * .font.icon {
 *   font-family: "vui";
 *
 *   &.cloud:before {
 *     content: "\e600";
 *   }
 * }
 * ```
 */

module.exports = function (iconName, family) {
  return new Icon({
    $css: {
      $addClass: iconName
    },
    $family: family || 'vui'
  })
}