require('./style.less')
var Element = require('../../../element')

Element.prototype.inject(
  require( '../../../property/css' ),
  require( '../../../property/background' )
)

var Icon = new Element({
  $css: 'svg icon'
}).$Constructor

// svg path
module.exports = function (iconName, svgPath) {
  return new Icon({
    $background: (svgPath || 'svg/') + iconName + '.svg'
  })
}