'use strict'
var Observable = require('vigour-js/lib/observable')
module.exports = new Observable({
  on: {
    data: {
      prop () {
        console.log(this.parent)
        var node = this.parent.getNode()
        if (node) {
          this.render(node)
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
