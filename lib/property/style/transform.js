'use strict'
const getParentNode = require('../../render/dom/parent')
const props = require('../../render/nostate').property
const prefix = require('vigour-ua/navigator').prefix
const isNumber = require('vigour-util/is/number')
const transform = prefix + 'Transform'

exports.properties = {
  transform: {
    type: 'group',
    render (state, type, stamp, subs, tree, pnode, uid) {
      var store, val
      if (this.noState) {
        val = this.compute()
        store = []
      } else {
        val = this.compute(state.val)
        store = tree._[uid] || (tree._[uid] = [])
        if (!pnode) {
          pnode = getParentNode(this, state, type, stamp, subs, tree)
        }
      }
      if (typeof val === 'string') {
        store[0] = val
      }
      props(this, type, stamp, subs, tree, store)
      pnode.style[transform] = store.join(' ')
    },
    properties: {
      x: {
        type: 'style',
        render (state, type, stamp, subs, tree, store) {
          const val = state ? this.compute(state.val) : this.compute()
          store[1] = 'translate3d(' + (isNumber(val) ? val + 'px' : val) + ','
          store[2] = store[2] || '0,0)'
        }
      },
      y: {
        type: 'style',
        render (state, type, stamp, subs, tree, store) {
          const val = state ? this.compute(state.val) : this.compute()
          store[1] = store[1] || 'translate3d(0px,'
          store[2] = (isNumber(val) ? val + 'px' : val) + ', 0)'
        }
      },
      rotate: {
        type: 'style',
        render (state, type, stamp, subs, tree, store) {
          const val = state ? this.compute(state.val) : this.compute()
          store[3] = 'rotate(' + val + 'deg)'
        }
      },
      scale: {
        type: 'style',
        render (state, type, stamp, subs, tree, store) {
          const val = state ? this.compute(state.val) : this.compute()
          store[4] = 'scale(' + val + ')'
        }
      }
    }
  }
}
