'use strict'
var Property = require('./')
exports.properties = {
  css: new Property({
    $type: 'string',
    render (data, properties, children, rdata) {
      properties.className = (this.parent.key || rdata && rdata.key) + data
    }
  })
}
