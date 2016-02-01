'use strict'
var Property = require('./')
exports.properties = {
  text: new Property({
    $type: 'string',
    render (data, properties, children) {
      if (data) {
        children.push(data)
      }
    }
  })
}
