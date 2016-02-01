'use strict'
var Property = require('./')
exports.properties = {
  w: new Property({
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
