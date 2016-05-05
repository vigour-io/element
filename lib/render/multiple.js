'use strict'
const render = require('./single')

// how to allways get the correct order out of these fuckers
module.exports = function renderMultiple (state, type, stamp, subs, tree, sType) {
  const _ = subs._
  if (_) {
    if (sType === 'done') {
      if (_.d) {
        for (let i = 0, len = _.da.length; i < len; i += 2) {
          // render(_.da[i + 1], state, type, stamp, subs, tree, _.da[i])
        }
      }
    } else {
      if (type !== 'update' && _.ta) {
        for (let i = 0, len = _.ta.length; i < len; i += 2) {
          render(_.ta[i + 1], state, type, stamp, subs, tree, _.ta[i])
        }
      }
      if (_.sa) {
        for (let i = 0, len = _.sa.length; i < len; i += 2) {
          render(_.sa[i + 1], state, type, stamp, subs, tree, _.sa[i])
        }
      }
    }
  }
}

// for (let uid in _.s) {
//   render(_.s[uid], state, type, stamp, subs, tree, uid)
// }
// for (let uid in _.t) {
//   render(_.t[uid], state, type, stamp, subs, tree, uid)
// }
