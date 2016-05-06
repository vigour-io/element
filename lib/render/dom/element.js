'use strict'
const create = require('./create')
const createState = create.state
const getParent = require('./parent')

exports.properties = {
  staticIndex: true,
  _cachedNode: true
}

exports.render = {
  static: create.static,
  state (target, state, type, stamp, subs, tree, pnode, id, pid) {
    var domNode = tree._ && tree._[id]
    if (type !== 'update' && type !== 'new') {
      if (domNode) {
        if (!pnode) {
          pnode = getParent(type, stamp, subs, tree, pid)
        }
        if (pnode) {
          // if not remove handler... nasty nasty check
          pnode.removeChild(domNode)
        }
        delete tree._[id]
      }
    } else if (!domNode) {
      domNode = createState(target, state, type, stamp, subs, tree, pnode, id, pid)
    }
    return domNode
  }
}
