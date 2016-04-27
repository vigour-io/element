'use strict'
const getParentNode = require('../render/dom/parent')
const props = require('../render/nostate').property
// first this one!

exports.properties = {
  props: {
    type: 'property',
    render (state, type, stamp, subs, tree, ptree, rtree, pnode, uid) {
      // maybe use _parent everywhere -- see if its possible
      if (!this._parent._cachedNode) {
        pnode = pnode || getParentNode(uid, this, state, type, stamp, subs, tree, ptree, rtree)
        if (pnode) {
          console.log('hello')
          props(this, type, stamp, subs, tree, ptree, rtree, pnode)
        }
      }
    },
    Child: {
      render (state, type, stamp, subs, tree, ptree, rtree, pnode) {
        // pass along correct uid -- else it slow as fuck!
        pnode = pnode || getParentNode(this.parent.uid(), this.parent, state, type, stamp, subs, tree, ptree, rtree)
        pnode.setAttribute(this.key, state ? this.compute(state.compute()) : this.compute())
      }
    }
  }
}
