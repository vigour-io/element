'use strict'
var Observable = require('vigour-js/lib/observable')
module.exports = new Observable({
  on: {
    data: {
      prop () {
        var parent = this.parent
        if (parent) {
          while (!parent.getNode) {
            parent = parent.parent
          }
          var node = parent.getNode()
          if (node) {
            this.render(node)
          }
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
