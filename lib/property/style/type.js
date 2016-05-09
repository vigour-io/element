'use strict'
const getParent = require('../../render/dom/parent')

exports.type = 'property'
exports.render = {
  static (target, pnode) {
    pnode.style[target.key] = target.compute()
  },
  state (target, state, type, stamp, subs, tree, id, pid) {
    const pnode = getParent(type, stamp, subs, tree, pid)
    pnode.style[target.key] = state
    ? target.compute(state.val)
    : target.compute()
  }
}
