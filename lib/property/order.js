'use strict'
var Property = require('./')
exports.properties = {
  src: new Property({
    $type: 'string',
    render (val, properties, children) {
      if (!properties.style) {
        properties.style = {}
      }
      properties.style.order = val || 0
    }
  })
}
