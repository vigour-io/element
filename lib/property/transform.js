'use strict'
var StyleProp = require('./style')
var ua = require('../ua')
var prefix = ua.prefix
// this has to go better allways do one first for example something like that
exports.properties = {
  x: new StyleProp({
    dom: prefix + 'Transform',
    render (val, properties, children) {
      var x = val || 0
      var y = properties._y || 0
      properties._x = x
      properties.style[prefix + 'Transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)'
    }
  }),
  y: new StyleProp({
    dom: prefix + 'Transform',
    render (val, properties, children) {
      var y = val || 0
      var x = properties._x || 0
      properties._y = y
      properties.style[prefix + 'Transform'] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)'
    }
  })
}
