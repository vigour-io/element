'use strict'
var Property = require('./')
exports.properties = {
  order: new Property({
    $type: 'number',
    define: { compare () {} },
    render (val, properties, children) {
      // children.

      // TODO remove this fix
      if(!properties) return

      this.parent._keys = null
      properties.key = val
      // this.parent.
      // console.error('yo order', val)
      // have to handle compare etc if it passes just clear keys or something
      // exec order higher up
    }
  })
}
