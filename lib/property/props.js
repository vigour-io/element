'use strict'
const getParent = require('../render/dom/parent')
const props = require('../render/nostate').property

exports.properties = {
  props: {
    type: 'property',
    render (state, type, stamp, subs, tree, pnode, uid) {
      // WRONG NEED CONTEXT

      // this is wrong!!!!
      if (!this.cParent()._cachedNode) { // check if this is ok to use
        if (!pnode) {
          pnode = getParent(this, state, type, stamp, subs, tree, uid)
        }
        props(this, type, stamp, subs, tree, pnode)
      }
    },
    Child: {
      render (state, type, stamp, subs, tree, pnode, uid) {
        if (!pnode) {
          // this is wrong can create problems
          pnode = getParent(this.cParent(), state, type, stamp, subs, tree, uid)
        }
        if (pnode) {
          pnode.setAttribute(this.key, state ? this.compute(state.compute()) : this.compute())
        }
      }
    }
  }
}
