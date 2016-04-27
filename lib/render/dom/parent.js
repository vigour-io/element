'use strict'
const render = require('../single')

module.exports = function (uid, target, state, type, stamp, subs, tree, ptree) {
  const parent = target.parent
  if (parent) {
    let parentUid = parent.uid()
    let pnode
    if (subs._.s && subs._.s[parentUid] || subs._.t && subs._.t[parentUid]) {
      pnode = tree._[parentUid]
      if (!pnode) {
        pnode = render(parentUid, parent, state, type, stamp, subs, tree, ptree)
      }
    } else {
      pnode = findParent(ptree, parentUid)
    }
    return pnode
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
