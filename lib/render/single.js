'use strict'
module.exports = function renderSingle (target, state, type, stamp, subs, tree, id, pid) {
  if (type !== 'update' && type !== 'new') {
    if (target.__on.removeEmitter) {
      // this means im going to handle all removal myself
      target.__on.removeEmitter.emit(target, stamp, tree._ && tree._[id])
    }
  } else if (!tree._) {
    tree._ = {}
  }
  return target.render(state, type, stamp, subs, tree, void 0, id, pid)
}
