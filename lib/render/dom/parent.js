'use strict'
const render = require('../single')

module.exports = function (target, state, type, stamp, subs, tree) {
  const parent = target.parent // cParent()
  if (parent) {
    const uid = parent.uid()
    const _ = subs._
    if (_.s && _.s[uid] || _.t && _.t[uid]) {
      return tree._[uid] || render(parent, state, type, stamp, subs, tree, uid)
    } else {
      // maybe too high seeking? -- stop at any? or something?
      return findParent(tree, uid)
    }
  }
}

function findParent (tree, uid) {
  // stop at any? probably smart...
  // at the other hand this is a last measure!
  while (tree) {
    if (tree._ && tree._[uid]) {
      return tree._[uid]
    }
    tree = tree._parent
  }
}
