'use strict'
var Property = require('./')
exports.properties = {
  prerender: new Property({
    define: {
      parseValue () {
        return true
      }
    },
    render (val, props, children, data, current, prev) {
      this.__input.call(this.parent, props, children, data, current, prev)
    }
  })
}
