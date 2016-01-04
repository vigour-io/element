'use strict'
var Observable = require('vigour-js/lib/observable')
module.exports = new Observable({
  inject: require('../../lib/animation'),
  on: {
    data: {
      prop (data, event) {
        // TODO this is a dirty fix
        if (this._input !== null) {
          let parent = this.parent
          while (parent) {
            if (parent.getNode) {
              let node = parent.getNode()
              if (node) {
                this.render(node, event, parent)
              }
              break
            } else {
              parent = parent.parent
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
