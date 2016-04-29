'use strict'
const getParentNode = require('../../render/dom/parent')
const props = require('../../render/nostate').property
const prefix = require('vigour-ua/navigator').prefix
const isNumber = require('vigour-util/is/number')
const transform = prefix + 'Transform'

exports.properties = {
  transform: { // store 0

    type: 'style',
    render (state, type, stamp, subs, tree, pnode) {
      if (!pnode) {
        pnode = getParentNode(this.parent, state, type, stamp, subs, tree)
      }
      const val = state ? this.compute(state.val) : this.compute()
      if (typeof val === 'string') {
        const store = getStore(this.parent, tree)
        store[0] = val
      }

      props(this, type, stamp, subs, tree, pnode) // pass store
    },
    properties: {
      x: { // store 1
        type: 'style',
        render (state, type, stamp, subs, tree, pnode) {
          const val = state ? this.compute(state.val) : this.compute()
          const store = getStore(this.parent, tree)
          store[1] = 'translate3d(' + (isNumber(val) ? val + 'px' : val) + ','
          store[2] = store[2] || '0,0)'
          console.log('x:', store.join(' '))
        }
      },
      y: { // store 2
        type: 'style',
        render (state, type, stamp, subs, tree, pnode) {
          const val = state ? this.compute(state.val) : this.compute()
          const store = getStore(this.parent, tree)
          store[1] = store[1] || 'translate3d(0px,'
          store[2] = (isNumber(val) ? val + 'px' : val) + ', 0)'
          console.log('y:', store.join(' '))
        }
      },
      rotate: { // store 3
        type: 'style',
        render (state, type, stamp, subs, tree, pnode) {
          const val = state ? this.compute(state.val) : this.compute()
          const store = getStore(this.parent, tree)
          store[3] = 'rotate(' + val + 'deg)'
          console.log('rotate:', store.join(' '))
        }
      },
      scale: { // store 4
        type: 'style',
        render (state, type, stamp, subs, tree, pnode) {
          const val = state ? this.compute(state.val) : this.compute()
          const store = getStore(this.parent, tree)
          store[4] = 'scale(' + val + ')'
          console.log('scale:', store.join(' '))
        }
      }
    }
  }
}

function getStore (parent, tree) {
  const uid = parent.uid()
  return tree._[uid] || (tree._[uid] = [])
}
