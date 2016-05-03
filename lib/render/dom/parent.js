'use strict'
const render = require('../single')
const computeId = require('../../context/compute')

module.exports = function (target, state, type, stamp, subs, tree, uid) {
  if (!uid) {
    throw new Error('PARENT - ALLWAYS NEED UID FROM SUBS! ' + target.inspect())
  }
  var puid = computeId(target, uid, subs)
  var parent
  if (puid) {
    parent = target.cParent()
  } else {
    parent = target._parent
  }
  if (parent) {
    if (!puid) { puid = parent._uid }
    const _ = subs._
    if (_.s && _.s[puid] || _.t && _.t[puid]) {
      return tree._[puid] || render(parent, state, type, stamp, subs, tree, puid)
    } else {
      return findParent(tree, puid)
    }
  }
}

function findParent (tree, uid) {
  while (tree) {
    if (tree._ && tree._[uid]) {
      return tree._[uid]
    }
    tree = tree._p
  }
}
