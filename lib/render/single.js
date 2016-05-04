'use strict'
module.exports = function renderSingle (target, state, type, stamp, subs, tree, uid) {
  if (type !== 'update' && type !== 'new') {
    if (target.__on.removeEmitter) {
      target.__on.removeEmitter.emit(target, stamp, tree._ && tree._[uid])
    }
  } else if (!tree._) {
    tree._ = {}
  }
  return target.render(state, type, stamp, subs, tree, void 0, uid)
}
