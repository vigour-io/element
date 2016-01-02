'use strict'
var Observable = require('vigour-js/lib/observable')
module.exports = new Observable({
  inject: require('../../lib/animation'),
  on: {
    data: {
      prop (data, event) {
        // TODO this is a dirty fix
        var parent = this.parent
        if (parent) {
          while (parent && !parent.getNode) {
            parent = parent.parent
          }
          if (parent && parent.getNode) {
            var node = parent.getNode()
            if (node) {
              this.render(node, event)
            }
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
