'use strict'
const render = require('../single')
const computeId = require('../../context/compute')
const getContextParent = require('../../context/parent')

module.exports = function getParent (target, state, type, stamp, subs, tree, uid) {
  if (!uid) {
    throw new Error('PARENT - ALLWAYS NEED UID FROM SUBS! ' + target.inspect())
  }
  var puid = computeId(target, uid, subs)
  const parent = getContextParent(puid, target, subs)

  if (parent) {
    const _ = subs._
    if (!puid) { puid = parent._uid } // can be done better...
    if (_.s && _.s[puid] || _.t && _.t[puid]) {
      return tree._[puid] || (type === 'update' || type === 'new') &&
        render(parent, state, type, stamp, subs, tree, puid)
    } else {
      return findParent(tree, puid)
    }
  }
}

function findParent (tree, uid) {
  // dont look up to far on remove... its really heavy...
  while (tree) {
    if (tree._ && tree._[uid]) {
      return tree._[uid]
    }
    tree = tree._p
  }
}
