'use strict'
const create = require('./create')
const getParent = require('./parent')

exports.properties = {
  staticIndex: true,
  _cachedNode: true
}

exports.define = {
  render (state, type, stamp, subs, tree, pnode, uid) {
    var domNode = !this.isStatic && tree._ && tree._[uid]
    if (type !== 'update' && type !== 'new') {
      if (domNode) {
        if (!pnode) {
          pnode = getParent(this, state, type, stamp, subs, tree, uid)
        }
        if (pnode) {
          pnode.removeChild(domNode)
        }
        delete tree._[uid]
      }
    } else if (!domNode) {
      domNode = create(this, state, type, stamp, subs, tree, pnode, uid)
    }
    return domNode
  }
}
