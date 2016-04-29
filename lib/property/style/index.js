'use strict'
const getParentNode = require('../../render/dom/parent')
const props = require('../../render/nostate').property

exports.components = {
  style: require('./type')
}

exports.properties = {
  style: {
    type: 'property',
    render (state, type, stamp, subs, tree, pnode, uid) {
      if (!this.parent._cachedNode) { // check if this is ok to use
        if (!pnode) {
          pnode = getParentNode(this, state, type, stamp, subs, tree)
        }
        props(this, type, stamp, subs, tree, pnode)
      }
    },
    inject: require('./px'),
    Child: { type: 'style' }
  }
}
