'use strict'
var Property = require('./')
exports.properties = {
  display: new Property({
    render (val, properties, children) {
      if (!properties.style) {
        properties.style = {}
      }
      if (val === true) {
        properties.style.display = 'block'
      } else if (typeof val !== 'string') {
        properties.style.display = 'none'
      } else {
        properties.style.display = val
      }
    }
  })
}
