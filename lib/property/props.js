'use strict'
const getParent = require('../render/dom/parent')
const props = require('../render/static').property

exports.properties = {
  props: {
    type: 'property',
    render (state, type, stamp, subs, tree, pnode, uid) {
      // WRONG NEED CONTEXT
      // this is wrong!!!!
      console.log('PROPS!', this.path(), uid, pnode, this.cParent())
      if (!this._staticProps || !this.cParent()._cachedNode) { // check if this is ok to use -- not ok
        if (!pnode) {
          pnode = getParent(this, state, type, stamp, subs, tree, uid)
        }
        console.log('yo static!')
        props(this, type, stamp, subs, tree, pnode)
      }
    },
    Child: {
      render (state, type, stamp, subs, tree, pnode, uid) {
        console.log('PROPS CHILD!', uid, this.path())
        if (!pnode) {
          // this is wrong can create problems

          // this.cParent() problem time!
          //this.cParent()
          pnode = getParent(false, state, type, stamp, subs, tree, uid)
        }

        if (!pnode) {
          throw new Error(`
            cannot find pnode for property
            uid: "${uid}"
            prop: "${this.path().join('/')}"
            ${(state ? `state: "${state.inspect()}"` : '')}
          `)
        }
        pnode.setAttribute(this.key, state ? this.compute(state.compute()) : this.compute())
      }
    }
  }
}
