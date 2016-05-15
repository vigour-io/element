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
          key(target, pid),
          target.storeState(state, type, stamp, subs, tree, pid + 'class', pid),
          target,
          getParent(type, stamp, subs, tree, pid)
        )
      }
    },
    Child: {
      define: {
        collect (val, store, id) {
          const _ = store._ || (store._ = {})
          const index = _[id] || (_[id] = store.length + 1)
          store[index] = val ? typeof val === 'string' ? val : this.key : ''
        }
      },
      render: {
        static (target, pnode, store) {
          target.collect(target.compute(), store, target.uid())
        },
        state (target, state, type, stamp, subs, tree, id, pid) {
          target.collect(target.compute(state), target.getStore(tree, pid + 'class'), id)
        }
      }
    }
  }
}

function setClassName (key, val, target, pnode) {
  if (val) {
    pnode.className = key ? key + ' ' + val : val
  } else if (key) {
    pnode.className = key
  }
}

function key (target, pid) {
  if (pid[0] === 'c') {
    for (let i = pid.length - 1; i >= 0; i--) {
      if (pid[i] === '-') {
        return pid.slice(1, i)
      }
    }
  }
  return target.cParent().key
}

// default makes sure it always sets "key"
exports.class = ''