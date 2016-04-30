'use strict'
const getParentNode = require('../../render/dom/parent')
const prefix = require('vigour-ua/navigator').prefix
const unit = require('./util').appendUnit
const transform = prefix + 'Transform'

exports.properties = {
  transform: {
    type: 'group',
    render (state, type, stamp, subs, tree, pnode, uid) {
      var val
      if (this.noState) {
        val = this.tempVal(type, stamp, subs, tree)
      } else {
        val = this.storeVal(state, type, stamp, subs, tree, uid)
        pnode = pnode || getParentNode(this.parent, state, type, stamp, subs, tree)
      }
      pnode.style[transform] = val
    },
    properties: {
      x: {
        render (state, type, stamp, subs, tree, store) {
          if (!store) { store = this.getStore(tree) }
          if (!store[2]) { store[2] = '0,0)' }
          const val = state ? this.compute(state.val) : this.compute()
          store[1] = 'translate3d(' + unit(val, 'px') + ','
        }
      },
      y: {
        render (state, type, stamp, subs, tree, store) {
          if (!store) { store = this.getStore(tree) }
          if (!store[1]) { store[1] = 'translate3d(0,' }
          const val = state ? this.compute(state.val) : this.compute()
          store[2] = unit(val, 'px') + ', 0)'
        }
      },
      rotate: {
        render (state, type, stamp, subs, tree, store) {
          if (!store) { store = this.getStore(tree) }
          const val = state ? this.compute(state.val) : this.compute()
          store[3] = 'rotate(' + unit(val, 'deg') + ')'
        }
      },
      scale: {
        render (state, type, stamp, subs, tree, store) {
          if (!store) { store = this.getStore(tree) }
          const val = state ? this.compute(state.val) : this.compute()
          store[4] = 'scale(' + val + ')'
        }
      }
    }
  }
}

function setTransform (pnode, val) {
  pnode.style[transform] = val
}
