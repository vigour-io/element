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

// font icons
module.exports = function (iconName, family) {
  return new Icon({
    $css: {
      $addClass: iconName
    },
    $family: family || 'vui'
  })
}