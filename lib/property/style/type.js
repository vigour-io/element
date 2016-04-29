'use strict'
const getParentNode = require('../../render/dom/parent')

exports.type = 'property'
exports.render = {
  dom (state, type, stamp, subs, tree, pnode) {
    if (!pnode) {
      let parent = this.parent
      pnode = getParentNode(parent.uid(), parent, state, type, stamp, subs, tree)
    }
    let val = state ? this.compute(state.val) : this.compute()
    pnode.style[this.key] = val
  },
  hyperscript (state, type, stamp, subs, tree, pnode, uid) {

  }
}
