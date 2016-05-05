'use strict'
const render = require('../single')
const computeId = require('../../context/compute')

module.exports = function getParent (target, state, type, stamp, subs, tree, uid) {
  if (!uid) {
    throw new Error('PARENT - ALLWAYS NEED UID FROM SUBS! ' + target.inspect())
  }
  const _ = subs._
  var puid = computeId(uid, subs)
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
      // need d but dont need to lookup
      const parent = subs._.t[puid] || subs._.s[puid] || subs._.d[puid]
      if (!parent) {
        // never gets here since we check for puid
        // create this case
        throw new Error('HEY HEY NO PARENT -- not to search parent subs as well', uid)
      }
      // preferebly here we allways have the correct order then you never need to render in here
      return render(parent, state, type, stamp, subs, tree, puid)
    }
  } else {
    return findParent(tree, puid)
  }
}

// dont need to walk up so far only in the subs parents -- can allways find the uid!
// much better then again it becomes exactly the same
function findParent (tree, uid) {
  // dont look up to far on remove... its really heavy...
  while (tree) {
    if (tree._ && tree._[uid]) {
      return tree._[uid]
    }
    tree = tree._p
  }
}
