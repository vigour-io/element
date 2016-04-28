'use strict'
const render = require('../single')

module.exports = function (uid, target, state, type, stamp, subs, tree, ptree) {
  const parent = target.parent
  if (parent) {
    let parentUid = parent.uid()
    let pnode
    let _ = subs._
    if (_.s && _.s[parentUid] || _.t && _.t[parentUid]) {
      pnode = tree._[parentUid]
      if (!pnode) {
        pnode = render(parentUid, parent, state, type, stamp, subs, tree, ptree, 'dom')
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
