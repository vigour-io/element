'use strict'
const render = require('../single')

module.exports = function (target, state, type, stamp, subs, tree) {
  const parent = target.parent
  if (parent) {
    const parentUid = parent.uid()
    const _ = subs._
    if (_.s && _.s[parentUid] || _.t && _.t[parentUid]) {
      return tree._[parentUid] || render(parent, state, type, stamp, subs, tree, parentUid)
    } else {
      return findParent(tree, parentUid)
    }
  }
}

function findParent (tree, uid) {
  while (tree) {
    if (tree._ && tree._[uid]) {
      return tree._[uid]
    }
    tree = tree._parent
  }
}
