'use strict'
const getParentNode = require('../render/dom/parent')
// first this one!

exports.properties = {
  props: {
    type: 'property',
    render (state, type, stamp, subs, tree, ptree, rtree, pnode, uid) {
      if (!this.exec) {
        // want to remove this need non-state here!
        this.exec = true
        pnode = pnode || getParentNode(uid, this, state, type, stamp, subs, tree, ptree, rtree)
        if (pnode) {
          console.log('?')
          this.each(function (p, key) {
            if (!p.$) {
              pnode.setAttribute(key, p.compute())
            }
          })
        }
      }
    },
    Child: {
      render (state, type, stamp, subs, tree, ptree, rtree, pnode) {
        // pass along correct uid?
        pnode = pnode || getParentNode(this.parent.uid(), this.parent, state, type, stamp, subs, tree, ptree, rtree)
        pnode.setAttribute(this.key, state ? this.compute(state.compute()) : this.compute())
      }
    }
  }
}
