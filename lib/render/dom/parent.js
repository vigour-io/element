'use strict'
const render = require('../single')

module.exports = function (target, state, type, stamp, subs, tree, pnode) {
  if (!pnode) {
    const parent = target.parent
    if (parent) {
      const parentUid = parent.uid()
      const _ = subs._
      if (_.s && _.s[parentUid] || _.t && _.t[parentUid]) {
        // tree
        pnode = tree._[parentUid] || render(parent, state, type, stamp, subs, tree, parentUid)
      } else {
        pnode = findParent(tree, parentUid)
      }
    }
  }
  return pnode
}

function findParent (tree, uid) {
  while (tree) {
    if (tree._ && tree._[uid]) {
      return tree._[uid]
    }
    tree = tree._parent
  }
}
