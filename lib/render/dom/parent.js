'use strict'
const render = require('../single')
module.exports = function getParent (state, type, stamp, subs, tree, pid) {
  // refactor this away jsut allways pass pnode and your done!
  if (!pid) {
    if (pid === false) {
      // console.warn('no pid must be app')
    } else {
      throw new Error(`allways need pid:"${pid}"`)
    }
  }
  return get(state, type, stamp, subs, tree, pid)
}

function get (state, type, stamp, subs, tree, pid) {
  const _ = subs._
  if (_.s && _.s[pid] || _.t && _.t[pid]) {
    const node = tree._[pid]
    if (node) {
      return node
    } else {
      if (type === 'update' || type === 'new') {
        console.error('removal this is maybe a bit extreme to crash but we want clean code')
      }
      throw new Error('this is wrong! trying to render parent we never want that!')
    }
  } else {
    if (_.p) {
      return get(state, type, stamp, _.p, tree._p, pid)
    }
  }
}
