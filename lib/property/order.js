'use strict'
var Property = require('./')
exports.properties = {
  order: new Property({
    $type: 'number',
    define: { compare () {} },
    render (val, properties, children) {
      this.parent.parent._keys = null
      console.warn('yo', this.path)
      properties.key = val
    }
  })
}
