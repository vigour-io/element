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
    const _ = subs._
    if (!puid) { puid = parent._uid } // can be done better...
    if (_.s && _.s[puid] || _.t && _.t[puid]) {
      return tree._[puid] || !/remove/.test(type) && render(parent, state, type, stamp, subs, tree, puid)
    } else {
      // 10 double check this
      return findParent(tree, puid)
    }
  }
}

function findParent (tree, uid) {
  // dont look up to far on remove...
  while (tree) {
    if (tree._ && tree._[uid]) {
      return tree._[uid]
    }
    tree = tree._p
  }
}
