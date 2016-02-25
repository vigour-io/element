'use strict'
exports.properties = {
  value: {
    type: 'property',
    dom: 'value',
    $type: 'string',
    render (val, properties, children) {
      properties.value = val
    }
  }
}
