require('./style.less')
var Element = require('../../../element')

Element.prototype.inject(
  require('../../../property/css'),
  require('../../../property/background')
)

var Icon = new Element({
  css: 'svg icon'
}).Constructor

/**
 * Icon component to inject `SVG` icon.
 * @function Icon
 * @param {string} iconName - Name of icon file
 * @param {string} [svgPath=svg/] - SVG file path
 * @memberOf Component
 *
 * @example
 * var Icon = require('vui/lib/components/icon/svg')
 * var a = new Icon('sun')
 */

module.exports = function (iconName, svgPath) {
  return new Icon({
    background: (svgPath || 'svg/') + iconName + '.svg'
  })
}
