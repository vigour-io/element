'use strict'
const render = require('./single')
module.exports = function renderMultiple (type, stamp, subs, tree, ptree, renderType) {
  // target
  const target = subs._
  if (target) {
    if (type !== 'update' && target.t) {
      for (let uid in target.t) {
        render(uid, target.t[uid], this, type, stamp, subs, tree, ptree, renderType)
      }
    }
    if (target.s) {
      for (let uid in target.s) {
        render(uid, target.s[uid], this, type, stamp, subs, tree, ptree, renderType)
      }
    }
  } else {
    // this is another problem
    console.error('whats going on no target????', subs, this.path())
  }
}