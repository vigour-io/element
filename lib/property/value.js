'use strict'
var Property = require('./')
exports.properties = {
  value: new Property({
    dom: 'value',
    $type: 'string',
    render (val, properties, children) {
      console.info('VAL', '???', val)
      properties.value = val
    }
  })
}
