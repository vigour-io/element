'use strict'
var Observable = require('vigour-js/lib/observable')
module.exports = new Observable({
  inject: require('../../lib/animation'),
  on: {
    data: {
      prop (data, event) {
        console.error('WHATWHAT', this.path)
        // TODO this is a dirty fix
        var parent = this.parent
        if (parent) {
          while (!parent.getNode) {
            parent = parent.parent
          }
          var node = parent.getNode()
          if (node) {
            console.error('RENDER', this.path)
            this.render(node, event)
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
