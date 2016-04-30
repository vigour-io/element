'use strict'
// all dom not good
const getParentNode = require('../render/dom/parent')
const props = require('../render/nostate').property

exports.properties = {
  props: {
    type: 'property',
    render (state, type, stamp, subs, tree, pnode, uid) {
      if (!this.parent._cachedNode) { // check if this is ok to use
        if (!pnode) {
          pnode = getParentNode(this, state, type, stamp, subs, tree)
        }
        props(this, type, stamp, subs, tree, pnode)
      }
    },
    Child: {
      render (state, type, stamp, subs, tree, pnode, uid) {
        if (!pnode) {
          pnode = getParentNode(this.parent, state, type, stamp, subs, tree)
        }
        if (pnode) {
          pnode.setAttribute(this.key, state ? this.compute(state.compute()) : this.compute())
        }
      }
    }
  }
}
