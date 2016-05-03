'use strict'
const getParent = require('../../render/dom/parent')
const props = require('../../render/static').property

exports.components = {
  style: require('./type')
}

exports.properties = {
  style: {
    type: 'property',
    render (state, type, stamp, subs, tree, pnode, uid) {
      if (!this.cParent()._cachedNode) { // check if this is ok to use
        if (!pnode) {
          pnode = getParent(this, state, type, stamp, subs, tree)
        }
        props(this, type, stamp, subs, tree, pnode)
      }
    },
    inject: [
      require('./px'),
      require('./transform')
    ],
    Child: { type: 'style' }
  }
}
