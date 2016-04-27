'use strict'
const getParentNode = require('../../render/dom/parent')

exports.type = 'property'
exports.render = render

function render (state, type, stamp, subs, tree, ptree, rtree, pnode) {
  if (!pnode) {
    let parent = this.parent
    pnode = pnode || getParentNode(parent.uid(), parent, state, type, stamp, subs, tree, ptree, rtree)
  }
  let val = state ? this.compute(state.val) : this.compute()
  pnode.style[this.key] = val
}
