'use strict'
const render = require('./single')
module.exports = function renderMultiple (type, stamp, subs, tree, ptree) {
  const target = subs._
  if (target) {
    if (type !== 'update' && target.t) {
      for (let uid in target.t) {
        render(uid, target.t[uid], this, type, stamp, subs, tree, ptree)
      }
    }
    if (target.s) {
      for (let uid in target.s) {
        render(uid, target.s[uid], this, type, stamp, subs, tree, ptree)
      }
    }
  } else {
    // this is another problem
    console.error('whats going on no target????', subs, this.path())
  }
}
