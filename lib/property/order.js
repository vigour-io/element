'use strict'
exports.properties = {
  order: {
    type: 'property',
    $type: 'number',
    define: { compare () {} },
    render (val, properties, children) {
      this.parent.parent._keys = null
      properties.key = val
    }
  }
}
