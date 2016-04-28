'use strict'
const renderMultiple = require('./multiple')
const subscribe = require('vigour-state/subscribe')
const State = require('vigour-state')

  // as an extra option add the nested render function (/w type or somethig) type:'DOM'
  // type: 'hscript'
module.exports = function render (elem, state, type, callback) {
  const subs = elem.$map()
  const tree = { parent: true }
  console.log('SUBS:', subs)
  if (state === void 0) {
    renderMultiple.call(state, 'new', 0, subs, tree, void 0, tree)
  } else {
    if (!(state instanceof State)) { state = new State(state, false) }
    renderMultiple.call(state, 'new', state._lstamp, subs, tree, void 0, tree)
    if (callback) {
      subscribe(state, subs, function () {
        renderMultiple.apply(this, arguments)
        callback.apply(this, arguments)
      }, tree)
    } else {
      subscribe(state, subs, renderMultiple, tree)
    }
  }
  return tree._[elem.uid()]
}
