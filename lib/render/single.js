'use strict'
module.exports = function renderSingle (target, state, type, stamp, subs, tree, uid) {
  if (/remove/.test(type)) {
    if (target.__on.removeEmitter) {
      target.__on.removeEmitter.emit(target, stamp, tree._ && tree._[uid])
    }
  } else if (!tree._) {
    tree._ = {}
  }
  console.log('%crender:' + type, 'color: yellow;background-color: #333; padding: 2px;', target.path())
  return target.render(state, type, stamp, subs, tree, void 0, uid)
}
