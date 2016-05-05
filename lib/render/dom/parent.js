'use strict'
const render = require('../single')
const computeId = require('../../context/compute')

module.exports = function getParent (target, state, type, stamp, subs, tree, uid) {
  if (!uid) {
    throw new Error('PARENT - ALLWAYS NEED UID FROM SUBS! ' + target.inspect())
  }
  const _ = subs._
  var puid = computeId(uid, subs)
  console.log('bam lezzgit it', puid)
  if (!puid) {
    // this is then the only place where we need it
    if (!target) {
      throw new Error('need target to get parent uid when no cuid', uid)
    }
    puid = target._parent && target._parent._uid
  }

  if (_.s && _.s[puid] || _.t && _.t[puid]) {
    const node = tree._[puid]
    if (node) {
      return node
    } else if ((type === 'update' || type === 'new')) {
      // not enough need a lookup ofcourse
      const parent = subs._.t[puid] || subs._.s[puid] || subs._.d[puid]
      if (!parent) {
        throw new Error('HEY HEY NO PARENT -- not to search parent subs as well', uid)
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
