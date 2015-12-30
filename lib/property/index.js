'use strict'
var Observable = require('vigour-js/lib/observable')
module.exports = new Observable({
  on: {
    data: {
      prop () {
        // TODO this is a dirty fix
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
