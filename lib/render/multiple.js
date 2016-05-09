'use strict'
const render = require('./state')
module.exports = function renderMultiple (state, type, stamp, subs, tree, sType) {
  const _ = subs._
  if (sType === 'done') {
    if (_.dlist) {
      for (let i = 0, len = _.dlist.length; i < len; i += 3) {
        render(_.dlist[i + 2], state, type, stamp, subs, tree, _.dlist[i], _.dlist[i + 1])
      }
    }
  } else if (type !== 'update') {
    if (_.tList) {
      for (let i = 0, len = _.tList.length; i < len; i += 3) {
        render(_.tList[i + 2], state, type, stamp, subs, tree, _.tList[i], _.tList[i + 1])
      }
    }
  } else if (_.sList) {
    for (let i = 0, len = _.sList.length; i < len; i += 3) {
      render(_.sList[i + 2], state, type, stamp, subs, tree, _.sList[i], _.sList[i + 1])
    }
  }
}
