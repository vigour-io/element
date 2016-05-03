'use strict'
require('html-element') // dont need this in the browser! same thign add it in create to when not browser
const create = require('./create')
const getParent = require('./parent')
exports.properties = { staticIndex: true }
exports.define = {
  render (state, type, stamp, subs, tree, pnode, uid) {
    var domNode = tree._ && tree._[uid]
    if (type === 'remove') {
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
