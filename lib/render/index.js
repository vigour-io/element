'use strict'
const renderMultiple = require('./multiple')
const subscribe = require('vigour-state/subscribe')
const State = require('vigour-state')

  // as an extra option add the nested render function (/w type or somethig) type:'DOM'
module.exports = function render (elem, state, renderType, callback) {
  const subs = elem.$map()
  const tree = { parent: true }
  if (!renderType) {
    renderType = 'dom'
  }
  if (state === void 0) {
    renderMultiple.call(state, 'new', 0, subs, tree, void 0, renderType)
  } else {
    if (!(state instanceof State)) {
      state = new State(state, false)
    }
    renderMultiple.call(state, 'new', state._lstamp, subs, tree, void 0, renderType)
    if (callback) {
      subscribe(state, subs, function (type, stamp, subs, tree, ptree) {
        renderMultiple.call(this, type, stamp, subs, tree, ptree, renderType)
        callback.apply(this, arguments)
      }, tree)
    } else {
      subscribe(state, subs, function (type, stamp, subs, tree, ptree) {
        renderMultiple.call(this, type, stamp, subs, tree, ptree, renderType)
      }, tree)
    }
  }
  return tree._[elem.uid()]
}
