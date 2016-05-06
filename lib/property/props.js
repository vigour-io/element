'use strict'
const getParent = require('../render/dom/parent')
const props = require('../render/static').property

exports.properties = {
  props: {
    type: 'property',
    render (state, type, stamp, subs, tree, pnode, id, pid) {
      // may not be strong enough -- dont inspect statiProps before render!
      if (!this._staticProps || !this.cParent()._cachedNode) {
        if (!pnode) {
          pnode = getParent(state, type, stamp, subs, tree, pid)
        }
        props(this, type, stamp, subs, tree, pnode)
      }
    },
    Child: {
      render (state, type, stamp, subs, tree, pnode, id, pid) {
        // this will become a setting pid ONE UP vs parent
        console.error('warn prop need to make a setting for CORRECT PID')
        if (this.isStatic) {
          pnode.setAttribute(this.key, this.compute())
        } else {
          if (!pnode) {
            pnode = getParent(state, type, stamp, subs, tree, pid)
          }
          pnode.setAttribute(this.key, this.compute(state.compute()))
        }
      }
    }
  }
}
