'use strict'
const getParentNode = require('../render/dom/parent')
const props = require('../render/nostate').property

exports.properties = {
  props: {
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
    Child: {
      render (state, type, stamp, subs, tree, ptree, rtree, pnode) {
        if (!pnode) {
          let parent = this.parent
          pnode = pnode || getParentNode(parent.uid(), parent, state, type, stamp, subs, tree, ptree, rtree)
        }
        pnode.setAttribute(this.key, state ? this.compute(state.compute()) : this.compute())
      }
    }
  }
}
