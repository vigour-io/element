'use strict'
var Property = require('./')
exports.properties = {
  w: new Property({
    dom: 'width',
    render (val, properties, children) {
      if (val) {
        if (!properties.style) {
          properties.style = {}
        }
        properties.style.width = typeof val === 'string' ? val : val + 'px'
      }
    }
  }),
  h: new Property({
    dom: 'height',
    render (val, properties, children) {
      if (val) {
        if (!properties.style) {
          properties.style = {}
        }
        properties.style.height = typeof val === 'string' ? val : val + 'px'
      }
    }
  })
}
