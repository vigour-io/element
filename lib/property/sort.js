'use strict'
var Property = require('./')
exports.properties = {
  sort: new Property({
    define: {
      parseValue () {
        return true
      }
    },
    render (val, properties, children) {
      this._input.call(this.parent, children)
    }
  })
}
