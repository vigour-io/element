'use strict'
var Property = require('./')
exports.properties = {
  target: new Property({
    dom: 'target',
    $type: 'string',
    render (val, properties) {
      if (val) {
        properties.target = val
      }
    }
  })
}
