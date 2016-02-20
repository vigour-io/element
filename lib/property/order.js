'use strict'
var Property = require('./')
exports.properties = {
  order: new Property({
    $type: 'number',
    define: { compare () {} },
    render (val, properties, children) {
      // children.
      console.error('lets rerender doing number!')
      this.parent._keys = null
      // this.parent.
      // console.error('yo order', val)
      // have to handle compare etc if it passes just clear keys or something
      // exec order higher up
    }
  })
}
