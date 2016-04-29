'use strict'
const render = require('./single')

module.exports = function renderMultiple (state, type, stamp, subs, tree) {
  const target = subs._
  if (target) {
    if (type !== 'update' && target.t) {
      for (let uid in target.t) {
        render(target.t[uid], state, type, stamp, subs, tree, uid)
      }
    }
    if (target.s) {
      for (let uid in target.s) {
        render(target.s[uid], state, type, stamp, subs, tree, uid)
      }
    }
  } else {
    // this is another problem
    console.error('whats going on no target????', subs, state.path())
  }
}
