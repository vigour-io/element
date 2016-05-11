'use strict'
const getParent = require('../render/dom/parent')

exports.properties = {
  class: {
    type: 'group',
    storeContextKey: true,
    render: {
      static (target, pnode) {
        setClassName(target.cParent().key, target.storeStatic(pnode), target, pnode)
      },
      state (target, state, type, stamp, subs, tree, id, pid) {
        setClassName(
          key(target, id),
          target.storeState(state, type, stamp, subs, tree, pid + 'class', pid),
          target,
          getParent(type, stamp, subs, tree, pid)
        )
      }
    },
    Child: {
      render: {
        static (target, pnode, store) {
          collect(target.compute(), target, store, target.uid())
        },
        state (target, state, type, stamp, subs, tree, id, pid) {
          console.log('-- child:', pid, target.key, id, pid)
          collect(target.compute(state), target, target.getStore(tree, pid + 'class'), id)
        }
      }
    }
  }
}

function collect (val, target, store, id) {
  const _ = store._ || (store._ = {})
  const index = _[id] || (_[id] = store.length + 1)
  store[index] = val ? typeof val === 'string' ? val : target.key : ''
}

function setClassName (key, val, target, pnode) {
  if (val) {
    pnode.className = key ? key + ' ' + val : val
  } else if (key) {
    pnode.className = key
  }
}

function key (target, id) {
  if (id[0] === 'c') {
    for (let i = id.length - 1; i >= 0; i--) {
      if (id[i] === '-') {
        return id.slice(1, i)
      }
    }
  }
  return target.cParent().key
}

// default makes sure it always sets "key"
exports.class = ''