'use strict'
const getParent = require('../render/dom/parent')

exports.properties = {
  class: {
    type: 'group',
    render (state, type, stamp, subs, tree, pnode, uid) {
      var val
      if (this.isStatic) {
        val = this.tempVal(type, stamp, subs, tree)
      } else {
        val = this.storeVal(state, type, stamp, subs, tree, uid)
        pnode = pnode || getParent(this, state, type, stamp, subs, tree)
      }
      const key = this.parent.key
      if (val) {
        pnode.className = key ? key + ' ' + val : val
      } else if (key) {
        pnode.className = key
      }
    },
    Child: {
      render (state, type, stamp, subs, tree, store, uid) {
        if (!store) { store = this.getStore(tree) }
        if (!store._) { store._ = {} }
        const val = state ? this.compute(state.val) : this.compute()
        const index = store._[uid] || (store._[uid] = store.length + 1)
        store[index] = val ? typeof val === 'string' ? val : this.key : ''
      }
    }
  }
}

// default makes sure it always sets "key"
exports.class = ''
