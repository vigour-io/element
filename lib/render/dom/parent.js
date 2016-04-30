'use strict'
const render = require('../single')

module.exports = function (target, state, type, stamp, subs, tree) {
  const parent = target.parent
  if (parent) {
    const uid = parent.uid()
    const _ = subs._
    if (_.s && _.s[uid] || _.t && _.t[uid]) {
      return tree._[uid] ||
        render(parent, state, type, stamp, subs, tree, uid)
    } else {
      const p = findParent(tree, uid)
      if (p) {
        return p
      } else {
        // heavy and broken
        return findSubsParent(
          _._parent,
          tree._parent,
          uid, state,
          type,
          stamp,
          parent
        )
      }
    }
  }
}

function findSubsParent (subs, tree, parentUid, state, type, stamp, parent) {
  while (subs && tree) {
    let _ = subs._
    if (_.s && _.s[parentUid] || _.t && _.t[parentUid]) {
      // does not need to check for tree (allready done)
      console.log('tree:', tree, '\nsubs:', subs)
      return render(parent, state, type, stamp, subs, tree, parentUid)
    }
    // any does not exist in the tree -- be carefull!
    // not good enough yet
    tree = tree._parent
    subs = _._parent
  }
}

function findParent (tree, uid) {
  while (tree) {
    // here we can do the check
    if (tree._ && tree._[uid]) {
      return tree._[uid]
    }
    tree = tree._parent
  }
}
