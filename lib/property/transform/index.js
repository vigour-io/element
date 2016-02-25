'use strict'
var ua = require('../../ua')
var prefix = ua.prefix
var render = require('./render')

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
  },
  z: {
    type: 'style',
    dom: prefix + 'Transform',
    render (val, properties, children) {
      render.z(val, properties, children)
    }
  }
}
