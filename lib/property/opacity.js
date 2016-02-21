'use strict'
exports.properties = {
  opacity: {
    type: 'style',
    $type: 'number',
    render (val, properties, children) {
      properties.style.opacity = val
    }
  }
}
