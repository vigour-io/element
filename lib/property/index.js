'use strict'
var Observable = require('vigour-js/lib/observable')
module.exports = new Observable({
  on: {
    data: {
      prop (data, event) {
        var node = this.parent.getNode()
        if (node) {
          this.render(node, event, data)
        }
      }
    }
  },
  properties: {
    render (val) {
      this.define({
        render: val
      })
    }
  }
}).Constructor
