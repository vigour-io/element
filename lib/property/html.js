'use strict'
var Property = require('./')
exports.properties = {
  html: new Property({
    dom: 'innerHTML',
    $type: 'string',
    render (val, properties, children) {
      if (val) {
        properties.innerHTML = val
      }
    }
  })
}
