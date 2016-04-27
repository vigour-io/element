'use strict'
const render = require('./single')
module.exports = function renderMultiple (type, stamp, subs, tree, ptree, rtree) {
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
