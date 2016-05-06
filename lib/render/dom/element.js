'use strict'
const create = require('./create')
const getParent = require('./parent')

exports.properties = {
  staticIndex: true,
  _cachedNode: true
}

exports.define = {
  render (state, type, stamp, subs, tree, pnode, id, pid) {
    var domNode = !this.isStatic && tree._ && tree._[id]
    if (type !== 'update' && type !== 'new') {
      if (domNode) {
        if (!pnode) {
          pnode = getParent(state, type, stamp, subs, tree, pid)
        }
        if (pnode) {
          // if not remove handler... nasty check
          pnode.removeChild(domNode)
        }
        delete tree._[id]
      }
    } else if (!domNode) {
      domNode = create(this, state, type, stamp, subs, tree, pnode, id, pid)
    }
    return domNode
  }
}
