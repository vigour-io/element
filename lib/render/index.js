'use strict'
exports.multiple = function (type, stamp, subs, tree, ptree, rtree) {
  const target = subs._
  if (type !== 'update' && target.t) {
    for (let uid in target.t) {
      render(uid, target.t[uid], this, type, stamp, subs, tree, ptree, rtree)
    }
  }
  if (target.s) {
    for (let uid in target.s) {
      render(uid, target.s[uid], this, type, stamp, subs, tree, ptree, rtree)
    }
  }
}

exports.single = render

function render (uid, target, state, type, stamp, subs, tree, ptree, rtree) {
  if (type === 'remove') {
    if (target.__on.removeEmitter) {
      target.__on.removeEmitter.emit(target, stamp, tree._ && tree._[uid])
    }
  } else if (!tree._) {
    tree._ = {}
  }
  // pnode ??
  return target.render(state, type, stamp, subs, tree, ptree, rtree, void 0, uid)
}
