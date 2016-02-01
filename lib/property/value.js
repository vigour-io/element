'use strict'
var Property = require('./')
exports.properties = {
  src: new Property({
    $type: 'string',
    render (val, properties, children) {
      properties.value = val
    }
  })
}
