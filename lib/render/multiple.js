'use strict'
const render = require('./state')
const getParent = require('./dom/parent')

module.exports = function renderMultiple (state, type, stamp, subs, tree, sType) {
  const _ = subs._
  console.log('%cmultiple:', 'background:lightgrey', state.path(), type)
  if (sType === 'done') {
    if (_.dList) {
      for (let i = 0, len = _.dList.length; i < len; i += 3) {
        render(_.dList[i + 2], state, type, stamp, subs, tree, _.dList[i], _.dList[i + 1])
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
