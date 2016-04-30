'use strict'
const renderMultiple = require('./multiple')
const subscribe = require('vigour-state/subscribe')
const State = require('vigour-state')
const Element = require('../element')

  // as an extra option add the nested render function (/w type or somethig) type:'DOM'
module.exports = function render (elem, state, callback) {
  if (!(elem instanceof Element)) {
    elem = new Element(elem, false)
  }
  const subs = elem.$map()
  console.log('subs', subs)
  const tree = { parent: true }
  if (state === void 0) {
    renderMultiple(state, 'new', 0, subs, tree)
  } else {
    if (!(state instanceof State)) {
      state = new State(state, false)
    }
    renderMultiple(state, 'new', state._lstamp, subs, tree)
    if (callback) {
      subscribe(state, subs, function (state, type, stamp, subs, tree) {
        renderMultiple(state, type, stamp, subs, tree)
        callback(state, type, stamp, subs, tree)
      }, tree)
    } else {
      subscribe(state, subs, function (state, type, stamp, subs, tree) {
        renderMultiple(state, type, stamp, subs, tree)
      }, tree)
    }
  }
  return tree._[elem.uid()]
}
