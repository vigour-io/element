'use strict'
const getParent = require('../render/dom/parent')

//module.exports = function getParent (type, stamp, subs, tree, pid) {

exports.properties = {
  class: {
    type: 'group',
    render: {
      static (target, pnode) {
        console.log('class-static')
        // setClassName(target.storeStatic(pnode), target, pnode)
      },
      state (target, state, type, stamp, subs, tree, id, pid) {
        console.log('class-state')
        // setClassName(
        //   target.storeVal(state, type, stamp, subs, tree, id),
        //   target,
        //   getParent(type, stamp, subs, tree, pid)
        // )
      }
    },
    Child: {
      render: {
        static (target, pnode, store) {
          console.log('- child-static')
          // if (!store._) { store._ = {} }
          // nested(target.compute(), target, store, target.uid())
        },
        // WRONG ARGUMENTS OF COURSE DID NOT START /W STATE FOR GROUP
        state (target, state, type, stamp, subs, tree, store, id) {
          console.log('- child-state')
          // if (!store) { store = target.getStore(tree) }
          // if (!store._) { store._ = {} }
          // nested(target.compute(), target, store, id)
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
