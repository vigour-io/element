'use strict'
const getParent = require('../render/dom/parent')

exports.properties = {
  class: {
    type: 'group',
    render: {
      static (target, state, type, stamp, subs, tree, pnode, uid) {
        setClassName(target.tempVal(type, stamp, subs, tree), target, pnode)
      },
      state (target, state, type, stamp, subs, tree, pnode, uid) {
        setClassName(
          target.storeVal(state, type, stamp, subs, tree, uid),
          target,
          getParent(target, state, type, stamp, subs, tree)
        )
      }
    },
    Child: {
      render: {
        static (target, state, type, stamp, subs, tree, store, uid) {
          if (!store) { store = target.getStore(tree) }
          if (!store._) { store._ = {} }
          nested(target.compute(), target, store, uid)
        },
        state (target, state, type, stamp, subs, tree, store, uid) {
          if (!store) { store = target.getStore(tree) }
          if (!store._) { store._ = {} }
          nested(target.compute(), target, store, uid)
        }
      }
    }
  }
}

function nested (val, target, store, uid) {
  const index = store._[uid] || (store._[uid] = store.length + 1)
  store[index] = val ? typeof val === 'string' ? val : target.key : ''
}

function setClassName (val, target, pnode) {
  const key = target.cParent().key
  if (val) {
    pnode.className = key ? key + ' ' + val : val
  } else if (key) {
    pnode.className = key
  }
}

// default makes sure it always sets "key"
exports.class = ''
