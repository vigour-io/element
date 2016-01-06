'use strict'
var Observable = require('vigour-js/lib/observable')
module.exports = new Observable({
  inject: require('../../lib/animation'),
  on: {
    data: {
      prop (data, event) {
        let parent = this.parent
        while (parent) {
          if (parent._input === null) {
            return
          }
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
  },
  properties: {
    render (val) {
      this.define({
        render: val
      })
    }
  }
}).Constructor
