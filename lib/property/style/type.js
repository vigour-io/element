'use strict'
const getParentNode = require('../../render/dom/parent')

exports.type = 'property'
exports.render = function (state, type, stamp, subs, tree, pnode) {
  if (!pnode) {
    pnode = getParentNode(this.parent, state, type, stamp, subs, tree)
  }
  pnode.style[this.key] = state ? this.compute(state.val) : this.compute()
}
