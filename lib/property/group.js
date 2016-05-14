'use strict'
const props = require('../render/static').property
const getParent = require('../render/dom/parent')

exports.components = {
  group: {
    type: 'property',
    isGroup: true,
    define: {
      storeStatic (pnode) {
        const val = this.compute()
        const store = []
        props(this, pnode, store)
        return join(store, val)
      },
      storeState (state, type, stamp, subs, tree, id, pid) {
        const val = state && this.$ ? this.compute(state.val) : this.compute()
        const store = tree._[id] || (tree._[id] = [])
        const pnode = getParent(type, stamp, subs, tree, pid)
        const parsed = '_' + this.key + 'StaticParsed'
        if (!pnode[parsed]) {
          props(this, pnode, store)
          pnode[parsed] = true
        }
        return join(store, val)
      }
    },
    Child: {
      define: {
        getStore (tree, id) {
          if (this.$ !== true) {
            tree = tree._p
            while (!tree.$) { tree = tree._p }
          }
          const _ = tree._ || (tree._ = {})
          return _[id] || (_[id] = [])
        }
      }
    },
    defaultSubscription: 'done'
  }
}

function join (store, val) {
  if (typeof val === 'string') {
    store[0] = val
  }
  return store.join(' ')
}
