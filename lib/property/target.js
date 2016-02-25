'use strict'
exports.properties = {
  target: {
    type: 'property',
    dom: 'target',
    $type: 'string',
    render (val, properties) {
      if (val) {
        properties.target = val
      }
    }
  }
}
