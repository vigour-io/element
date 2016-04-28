'use strict'
const getParentNode = require('../../render/dom/parent')
const setPrefixed = require('./prefix')

exports.type = 'property'
exports.render = {
  dom (state, type, stamp, subs, tree, ptree, pnode) {
    if (!pnode) {
      let parent = this.parent
      pnode = getParentNode(parent.uid(), parent, state, type, stamp, subs, tree, ptree)
    }
    let val = state ? this.compute(state.val) : this.compute()
    setPrefixed(pnode, this.key, val)
  }
}
