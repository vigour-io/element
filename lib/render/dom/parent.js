'use strict'
const render = require('../single')
module.exports = function getParent (target, state, type, stamp, subs, tree, id, pid) {
  if (!pid) {
    if (pid === false) {
      console.warn('no pid must be app', id)
    } else {
      throw new Error(`allways need pid id:"${id} pid:"${pid}" path: ${target.path().join('/')}`)
    }
  }
  return get(state, type, stamp, subs, tree, pid, target)
}

function get (state, type, stamp, subs, tree, pid, target) {
  const _ = subs._
  // better branching (speed)
  if (_.s && _.s[pid] || _.t && _.t[pid]) {
    const node = tree._[pid]
    if (node) {
      return node
    } else if ((type === 'update' || type === 'new')) {
      // not enough need a lookup ofcourse
      // need d but dont need to lookup
      const parent =  _.t && _.t[pid] || _.s[pid]
      if (!parent) {
        // never gets here since we check for puid
        // create this case
        throw new Error('HEY HEY NO PARENT -- not to search parent subs as well', pid)
      }

      // JUST GOING TO THROW HERE
      console.error(
        'DONT WANT TO RENDER!',
        target.path().join('/'),
        '   rendering parent:', parent.path().join('/'), pid
      )
      // preferebly here we allways have the correct order then you never need to render in here
      // wrong state for render...
      console.group()
      var n = render(parent, state, type, stamp, subs, tree, pid)
      console.groupEnd()
      return n
    }
  } else {
    if (_.p) {
      return get(state, type, stamp, _.p, tree._p, pid)
    }
    // console.error('cant find have to go up CAN ONLY BE APP', subs, state.path(), target.inspect(), puid)
  }
}
