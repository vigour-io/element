'use strict'
const create = require('./create')
const getParent = require('./parent')
exports.properties = { staticIndex: true }
exports.define = {
  render (state, type, stamp, subs, tree, pnode, uid) {
    var domNode = tree._ && tree._[uid]
    if (/remove/.test(type)) {
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
