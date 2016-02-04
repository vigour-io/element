'use strict'
var Property = require('./')
exports.properties = {
  href: new Property({
    $type: 'string',
    render (val, properties) {
      if (val) {
        properties.href = val
      }
    }
  })
}