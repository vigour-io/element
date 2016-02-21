'use strict'
var ua = require('../../ua')
var prefix = ua.prefix
var render = require('./render')
// this has to go better allways do one first for example something like that
exports.properties = {
  x: {
    type: 'style',
    dom: prefix + 'Transform',
    render (val, properties, children) {
      render.x(val, properties, children)
    }
  },
  y: {
    type: 'style',
    dom: prefix + 'Transform',
    render (val, properties, children) {
      render.y(val, properties, children)
    }
  }
}
