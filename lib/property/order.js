'use strict'
var Property = require('./')
exports.properties = {
  order: new Property({
    $type: 'number',
    define: { compare () {} },
    render (val, properties, children) {
      // console.error('yo order', val)
      // have to handle compare etc if it passes just clear keys or something
      // exec order higher up
    }
  })
}
