'use strict'
const getParentNode = require('../../render/dom/parent')
const props = require('../../render/nostate').property

exports.components = {
  style: require('./type')
}

exports.properties = {
  style: {
    type: 'property',
    render (state, type, stamp, subs, tree, ptree, rtree, pnode, uid) {
      if (!this.parent._cachedNode) { // check if this is ok to use
        if (!pnode) {
          pnode = getParentNode(uid, this, state, type, stamp, subs, tree, ptree, rtree)
        }
        if (pnode) {
          props(this, type, stamp, subs, tree, ptree, rtree, pnode)
        }
      }
    },
    inject: require('./px'),
    Child: { type: 'style' }
  }
}
