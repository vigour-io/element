'use strict'
module.exports = function renderSingle (uid, target, state, type, stamp, subs, tree, ptree, renderType) {
  if (type === 'remove') {
    if (target.__on.removeEmitter) {
      target.__on.removeEmitter.emit(target, stamp, tree._ && tree._[uid])
    }
  } else if (!tree._) {
    tree._ = {}
  }
  return target.render[renderType].call(target, state, type, stamp, subs, tree, ptree, void 0, uid)
}
