'use strict'
var Property = require('./')
exports.properties = {
  order: new Property({
    define: { compare () {} },
    render (val, properties, children) {
      // have to handle compare etc if it passes just clear keys or something
      // exec order higher up
    }
  })
}
