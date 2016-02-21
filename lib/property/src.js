'use strict'
exports.properties = {
  src: {
    type: 'style',
    dom: 'src',
    $type: 'string',
    render (val, properties, children) {
      if (val) {
        properties.src = val
      }
    }
  }
}
