'use strict'
var Property = require('./')
exports.properties = {
  opacity: new Property({
    $type: 'number',
    render (val, properties, children) {
      if (!properties.style) {
        properties.style = {}
      }
      properties.style.opacity = val
    }
  })
}
