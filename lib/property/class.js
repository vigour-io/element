'use strict'
const getParent = require('../render/dom/parent')

//module.exports = function getParent (type, stamp, subs, tree, pid) {

exports.properties = {
  class: {
    type: 'group',
    render: {
      static (target, pnode) {
        setClassName(target.storeStatic(pnode), target, pnode)
      },
      state (target, state, type, stamp, subs, tree, id, pid) {
        const pnode = getParent(type, stamp, subs, tree, pid)
        const val = target.storeState(state, type, stamp, subs, tree, pid + 'class', pid)
        console.log('class:', pnode, target.cParent().key, id)
        setClassName(
          val,
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
        state (target, state, type, stamp, subs, tree, uid, pid) {
          console.log('classchild:', getParent(type, stamp, subs, tree, pid))
          collect(target.compute(state), target, target.getStore(tree, pid + 'class'), uid)
        }
      }
    }
  }
}

function collect (val, target, store, uid) {
  const _ = store._ || (store._ = {})
  const index = _[uid] || (_[uid] = store.length + 1)
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