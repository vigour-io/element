'use strict'
var Property = require('./')
exports.properties = {
  src: new Property({
    $type: 'string',
    render (val, properties, children) {
      if (val) {
        properties.src = val
      }
    }
  })
}
