'use strict'
const props = require('../render/static').property

exports.components = {
  group: {
    type: 'property',
    define: {
      tempVal (pnode) {
        const val = this.compute()
        const store = []
        props(this, pnode, store)
        return join(store, val)
      },
      storeVal (state, pnodetype, stamp, subs, tree, uid, pnode) {
        const val = state ? this.compute(state.val) : this.compute()
        const store = tree._[uid] || (tree._[uid] = [])
        if (!store._passed) {
          props(this, pnode, store)
          store._passed = true
        }
        return join(store, val)
      }
    },
    Child: {
      define: {
        getStore (tree) {
          const ptree = tree._p
          const _ = ptree._ || (ptree._ = {})
          // totally wrong UID!
          const uid = this.parent._uid
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
