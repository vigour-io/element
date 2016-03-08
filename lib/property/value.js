'use strict'
exports.properties = {
  value: {
    type: 'property',
    dom: 'value',
    $type: 'string',
    render (val, properties, children) {
      console.log(arguments)
      properties.value = val
    }
  }
}
