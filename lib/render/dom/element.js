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
  state (target, state, type, stamp, subs, tree, id, pid) {
    var domNode = tree._ && tree._[id]
    var pnode
    if (type !== 'update' && type !== 'new') {
      if (domNode) {
        pnode = getParent(type, stamp, subs, tree, pid)
        console.log('remove:', state.path(), pnode)
        if (pnode) {
          // if not remove handler... nasty nasty check
          if (target.node === 'fragment') {
            console.warn('not handling fragment removes yet!', domNode)
          } else {
            pnode.removeChild(domNode)
          }
        }
        delete tree._[id]
      }
    } else if (!domNode) {
      domNode = createState(target, state, type, stamp, subs, tree, id, pid)
    }
    return domNode
  }
}
