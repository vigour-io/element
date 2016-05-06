'use strict'
const render = require('../single')
module.exports = function getParent (type, stamp, subs, tree, pid) {
  // refactor this away jsut allways pass pnode and your done!
  if (!pid) {
    if (pid === false) {
      // console.warn('no pid must be app')
    } else {
      throw new Error(`allways need pid:"${pid}"`)
    }
  }
  return get(type, stamp, subs, tree, pid)
}

function get (type, stamp, subs, tree, pid) {
  const _ = subs._
  if (_.s && _.s[pid] || _.t && _.t[pid]) {
    const node = tree._[pid]
    if (node) {
      return node
    } else if (type === 'new' || type === 'update') {
      throw new Error(
        `No parent in tree` +
        `\n  type: "${type}" \n  pid: "${pid}"` +
        `\n  path: "${(_.s && _.s[pid] || _.t && _.t[pid]).path().join('/')}"`
      )
    } else {
      console.warn('remove --- this will be refactored so this does never happen')
    }
  } else {
    if (_.p) {
      return get(type, stamp, _.p, tree._p, pid)
    }
  }
}
