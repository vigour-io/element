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
    renderMultiple(renderType, state, 'new', 0, subs, tree)
  } else {
    if (!(state instanceof State)) {
      state = new State(state, false)
    }
    renderMultiple(renderType, state, 'new', state._lstamp, subs, tree)
    if (callback) {
      subscribe(state, subs, function (type, stamp, subs, tree, ptree) {
        renderMultiple(renderType, this, type, stamp, subs, tree, ptree)
        callback.apply(this, arguments)
      }, tree)
    } else {
      subscribe(state, subs, function (type, stamp, subs, tree, ptree) {
        renderMultiple(renderType, this, type, stamp, subs, tree, ptree)
      }, tree)
    }
  }
  return tree._[elem.uid()]
}
