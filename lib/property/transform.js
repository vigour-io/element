'use strict'
var Property = require('./')
var ua = require('../ua')
var prefix = ua.prefix
// this has to go better allways do one first for example something like that
exports.properties = {
  x: new Property({
    dom: prefix + 'Transform',
    render (val, properties, children) {
      var x = val || 0
      var y = properties._y || 0
      properties._x = x
      if (!properties.style) {
        properties.style = {}
      }
      properties.style[prefix + 'Transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)'
    }
  }),
  y: new Property({
    dom: prefix + 'Transform',
    render (val, properties, children) {
      var y = val || 0
      var x = properties._x || 0
      properties._y = y
      if (!properties.style) {
        properties.style = {}
      }
      properties.style[prefix + 'Transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)'
    }
  })
}
