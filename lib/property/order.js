'use strict'
var Property = require('./')
exports.properties = {
  order: new Property({
    $type: 'number',
    render (val, properties, children) {
      if (!properties.style) {
        properties.style = {}
      }
      properties.style.order = val || 0
    }
  })
}
