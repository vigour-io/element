'use strict'
const computeId = require('../context/compute')
const getParent = require('../render/dom/parent')
const props = require('../render/static').property

exports.properties = {
  props: {
    type: 'property',
    render (state, type, stamp, subs, tree, pnode, uid) {
      // may not be strong enough -- dont inspect statiProps before render!
      if (!this._staticProps || !this.cParent()._cachedNode) {
        if (!pnode) {
          pnode = getParent(this, state, type, stamp, subs, tree, uid)
        }
        props(this, type, stamp, subs, tree, pnode)
      }
    },
    Child: {
      render (state, type, stamp, subs, tree, pnode, uid) {
        if (!pnode) {
          pnode = getParent(
            this._parent,
            state,
            type,
            stamp,
            subs,
            tree, computeId(uid, subs) || this._parent._uid
          )
        }
        pnode.setAttribute(this.key, state ? this.compute(state.compute()) : this.compute())
      }
    }
  }
}
