'use strict'
const render = require('../single')
const computeId = require('../../context/compute')
module.exports = function getParent (target, state, type, stamp, subs, tree, uid) {
  var puid = computeId(uid, subs)
  if (!puid) {
    if (!target) {
      // this is then the only place where we need target
      throw new Error('need target to get parent uid when no cuid', uid)
    }
    puid = target._parent && target._parent._uid
  }
  return getuid(state, type, stamp, subs, tree, puid, target, false, uid)
}

function getuid (state, type, stamp, subs, tree, puid, target, no, uid) {
  const _ = subs._
  // better branching (speed)
  if (_.s && _.s[puid] || _.t && _.t[puid]) {
    const node = tree._[puid]
    if (node) {
      return node
    } else if ((type === 'update' || type === 'new')) {
      // not enough need a lookup ofcourse
      // need d but dont need to lookup
      const parent = _.t[puid] || _.s[puid]
      if (!parent) {
        // never gets here since we check for puid
        // create this case
        throw new Error('HEY HEY NO PARENT -- not to search parent subs as well', puid)
      }

      console.info('DONT WANT TO RENDER!', target.path().join('/'), uid)
      console.log('   rendering parent:', parent.path().join('/'), puid)
      // preferebly here we allways have the correct order then you never need to render in here
      // wrong state for render...
      console.group()
      var n = render(parent, state, type, stamp, subs, tree, puid)
      console.groupEnd()
      return n
    }
  } else {
    if (_.p) {
      return getuid(state, type, stamp, _.p, tree._p, puid, true, uid)
    }
    // console.error('cant find have to go up CAN ONLY BE APP', subs, state.path(), target.inspect(), puid)
  }
}
