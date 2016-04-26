'use strict'
const getParentNode = require('../render/dom/parent')
exports.properties = {
  attr: {
    type: 'property',
    render (state, type, stamp, subs, tree, ptree, rtree, pnode) {
      if (!this.exec) {
        // want to remove this need non-state here!
        this.exec = true
        pnode = pnode || getParentNode(this.uid(), this, state, type, stamp, subs, tree, ptree, rtree)
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
        pnode = pnode || getParentNode(this.parent.uid(), this.parent, state, type, stamp, subs, tree, ptree, rtree)
        pnode.setAttribute(this.key, state ? this.compute(state.compute()) : this.compute())
      }
    }
  }
}
