'use strict'
const render = require('./single')

// how to allways get the correct order out of these fuckers
module.exports = function renderMultiple (state, type, stamp, subs, tree, sType) {
  const _ = subs._
  if (_) {
    if (sType === 'done') {
      if (_.d) {
        for (let uid in _.d) {
          render(_.d[uid], state, type, stamp, subs, tree, uid)
        }
      }
    } else {
      if (type !== 'update' && _.t) {
        for (let uid in _.t) {
          render(_.t[uid], state, type, stamp, subs, tree, uid)
        }
      }
      if (_.s) {
        for (let uid in _.s) {
          render(_.s[uid], state, type, stamp, subs, tree, uid)
        }
      }
    }
  }
}
