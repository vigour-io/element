'use strict'
module.exports = function getParent (type, stamp, subs, tree, pid) {
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
      return getParent(type, stamp, _.p, tree._p, pid)
    }
  }
}
