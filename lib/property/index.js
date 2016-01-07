'use strict'
var Observable = require('vigour-js/lib/observable')
module.exports = new Observable({
  inject: require('../../lib/animation'),
  on: {
    data: {
      prop (data, event) {
<<<<<<< HEAD
=======
        // TODO this is a dirty fix
>>>>>>> 687ca1533e4c4ddea691df4cb1cfc4130fd9d968
        if (this._input !== null) {
          // very hard to find if its removed -- original is ofc still fine and dandy so prob have to pass data :/
          // fucked up
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
