'use strict'
// all dom not good
const getParentNode = require('../render/dom/parent')
const props = require('../render/nostate').property

exports.properties = {
  props: {
    type: 'property',
    render (state, type, stamp, subs, tree, pnode, uid) {
      if (!this.parent._cachedNode) { // check if this is ok to use
        pnode = getParentNode(this, state, type, stamp, subs, tree, pnode)
        if (pnode) {
          props(this, type, stamp, subs, tree, pnode)
        }
      }
    },
    Child: {
      render (state, type, stamp, subs, tree, pnode, uid) {
        getParentNode(this.parent, state, type, stamp, subs, tree, pnode)
          .setAttribute(this.key, state ? this.compute(state.compute()) : this.compute())
      }
    }
  }
}
