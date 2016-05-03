'use strict'
const getParent = require('../../render/dom/parent')

exports.type = 'property'
exports.render = function (state, type, stamp, subs, tree, pnode) {
  if (this.isStatic) {
    pnode.style[this.key] = this.compute()
  } else {
    if (!pnode) {
      pnode = getParent(this.cParent(), state, type, stamp, subs, tree)
    }
    pnode.style[this.key] = state ? this.compute(state.val) : this.compute()
  }
}
