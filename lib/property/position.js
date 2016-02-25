'use strict'
exports.properties = {
  position: {
    type: 'style',
    $type: 'string',
    render (val, properties, children) {
      properties.style.position = val
    }
  }
}
