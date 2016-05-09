'use strict'
const props = require('../render/static').property

exports.components = {
  group: {
    type: 'property',
    define: {
      storeStatic (pnode) {
        const val = this.compute()
        const store = []
        props(this, pnode, store)
        return join(store, val)
      },
      storeState (state, tree, uid) {
        const val = state ? this.compute(state.val) : this.compute()
        const store = tree._[uid] || (tree._[uid] = [])
        return join(store, val)
      }
    },
    Child: {
      define: {
        getStore (tree) {
          const ptree = tree._p
          const _ = ptree._ || (ptree._ = {})
          const uid = this.parent.uid()
          return _[uid] || (_[uid] = [])
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
