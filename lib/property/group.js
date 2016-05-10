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
      storeState (state, type, stamp, subs, tree, uid, pid) {
        const val = state ? this.compute(state.val) : this.compute()
        const store = tree._[uid] || (tree._[uid] = [])
        const pnode = getParent(type, stamp, subs, tree, pid)
        console.log('>>', tree, uid, pid)
        if (!pnode._groupStaticParsed) {
          props(this, pnode, store)
          pnode._groupStaticParsed = true
        }
        return join(store, val)
      }
    },
    Child: {
      define: {
        getStore (tree, uid) {
          const ptree = tree._p
          const _ = ptree._ || (ptree._ = {})
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
