'use strict'
const getParent = require('../render/dom/parent')

exports.properties = {
  class: {
    type: 'group',
    render: {
      static (target, pnode) {
        setClassName(target.tempVal(pnode), target, pnode)
      },
      state (target, state, type, stamp, subs, tree, pnode, id) {
        setClassName(
          target.storeVal(state, type, stamp, subs, tree, id),
          target,
          getParent(target, state, type, stamp, subs, tree)
        )
      }
    },
    Child: {
      render: {
        static (target, pnode, store) {
          if (!store._) { store._ = {} }
          nested(target.compute(), target, store, target.uid())
        },
        state (target, state, type, stamp, subs, tree, store, id) {
          if (!store) { store = target.getStore(tree) }
          if (!store._) { store._ = {} }
          nested(target.compute(), target, store, id)
        }
      }
    }
  }
}

function nested (val, target, store, id) {
  const index = store._[id] || (store._[id] = store.length + 1)
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
