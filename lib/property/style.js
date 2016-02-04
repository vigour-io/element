'use strict'
var Property = require('./')
module.exports = new Property({
  properties: {
    render (fn) {
      this.define({
        render (val, properties) {
          if (!properties.style) {
            properties.style = {}
          }
          fn.apply(this, arguments)
        }
      })
    }
  }
}).Constructor
