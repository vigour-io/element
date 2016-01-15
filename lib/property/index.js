'use strict'
var Observable = require('vigour-js/lib/observable')
var Base = require('vigour-js/lib/base')
module.exports = new Observable({
  inject: [
    require('../../lib/animation'),
    require('vigour-js/lib/operator/prepend'),
    require('../../lib/cases/inject')
  ],
  on: {
    data: {
      prop (data, event) {
        if (this._input !== null) {
          // very hard to find if its removed -- original is ofc still fine and dandy so prob have to pass data :/
          // fucked up
          let parent = this._contextLevel === 1 ? this._context : this._parent
          while (parent) {
            if (parent.getNode) {
              let node = parent.getNode()
              if (node) {
                this.render(node, event, parent)
              }
              // this.clearContext()
              break
            } else {
              // this is wrong of course needs fix
              parent = parent._contextLevel === 1 ? parent._context : parent._parent
            }
          }
        }
      }
    }
  },
  define: {
    contextRemove: Base.prototype.contextRemove,
    remove: Base.prototype.remove
  },
  properties: {
    render (val) {
      this.define({
        render: val
      })
    }
  }
}).Constructor
