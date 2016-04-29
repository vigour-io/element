'use strict'
const render = require('./single')

module.exports = function renderMultiple (renderType, state, type, stamp, subs, tree, ptree) {
  // target
  const target = subs._
  if (target) {
    if (type !== 'update' && target.t) {
      for (let uid in target.t) {
        render(renderType, target.t[uid], state, type, stamp, subs, tree, ptree, uid)
      }
    }
    if (target.s) {
      for (let uid in target.s) {
        render(renderType, target.s[uid], state, type, stamp, subs, tree, ptree, uid)
      }
    }
  } else {
    // this is another problem
    console.error('whats going on no target????', subs, state.path())
  }
}