'use strict'
const render = require('../single')
const computeId = require('../../context/compute')

module.exports = function getParent (target, state, type, stamp, subs, tree, uid) {
  if (!uid) {
    throw new Error('PARENT - ALLWAYS NEED UID FROM SUBS! ' + target.inspect())
  }
  const _ = subs._
  const cuid = computeId(target, uid, subs)
  var puid
  var parent

  if (!cuid) {
    parent = target._parent
    puid = parent && parent._uid
  } else {
    puid = cuid
  }

  if (_.s && _.s[puid] || _.t && _.t[puid]) {
    const node = tree._[puid]
    if (node) {
      return node
    } else if ((type === 'update' || type === 'new')) {
      console.error('HERE YOU GO', target.path())
      if (!parent) {
        parent = target._parent
      }
      return render(parent, state, type, stamp, subs, tree, puid)
    }
  } else {
    return findParent(tree, puid)
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
