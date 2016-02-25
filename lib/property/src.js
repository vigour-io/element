'use strict'
exports.properties = {
  src: {
    type: 'property',
    dom: 'src',
    $type: 'string',
    render (val, properties, children) {
      if (val) {
        properties.src = val
      }
    }
  }
}
