'use strict'
exports.properties = {
  href: {
    type: 'property',
    $type: 'string',
    render (val, properties) {
      if (val) {
        properties.href = val
      }
    }
  }
}
