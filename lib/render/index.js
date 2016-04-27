'use strict'
const renderMultiple = require('./multiple')
const subscribe = require('vigour-state/subscribe')
const State = require('vigour-state')

module.exports = function render (elem, state) {
  const subs = elem.$map()
  const tree = { parent: true }
  if (!(state instanceof State)) { state = new State(state) }
  renderMultiple.call(state, 'new', state._lstamp, subs, tree, void 0, tree)
  subscribe(state, subs, function (type, stamp, subs, ctree, ptree) {
    // remove this extra function -- saves speed
    renderMultiple.call(this, type, stamp, subs, ctree, ptree, tree)
  }, tree)
  return tree._[elem.uid()]
}
