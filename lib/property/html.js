'use strict'
var Property = require('./')
exports.properties = {
  html: new Property({
    $type: 'string',
    render (val, properties, children) {
      if (val) {
        properties.innerHTML = val
      }
    }
  })
}
