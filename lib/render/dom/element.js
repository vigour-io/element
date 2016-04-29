'use strict'
require('html-element')

const create = require('./create')
const getParentNode = require('./parent')
// TODO move this outside dom/element (not only dom)
exports.define = {
  render (state, type, stamp, subs, tree, pnode, uid) {
    var domNode = tree._ && tree._[uid]
    if (type === 'remove') {
      if (domNode) {
        getParentNode(this, state, type, stamp, subs, tree, pnode).removeChild(domNode)
        delete tree._[uid]
      }
    } else if (!domNode) {
      domNode = create(this, state, type, stamp, subs, tree, pnode, uid)
    }
    return domNode
  }
}
