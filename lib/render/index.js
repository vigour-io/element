'use strict'
const renderMultiple = require('./multiple')
const subscribe = require('vigour-state/subscribe')
const State = require('vigour-state')
const Element = require('../element')
const get = require('lodash.get')

module.exports = function render (elem, state, callback) {
  if (!(elem instanceof Element)) {
    elem = new Element(elem, false)
  }
  const subs = elem.$map()
  const tree = { parent: true }
  if (state === void 0) {
    renderMultiple(state, 'new', 0, subs, tree)
  } else {
    if (!(state instanceof State)) {
      state = new State(state, false)
    }
    renderMultiple(state, 'new', state._lstamp, subs, tree)
    if (callback) {
      subscribe(state, subs, function (state, type, stamp, subs, tree, sType) {
        renderMultiple(state, type, stamp, subs, tree, sType)
        callback(state, type, stamp, subs, tree, sType)
      }, tree)
    } else {
      subscribe(state, subs, renderMultiple, tree)
    }
  }
  const uid = elem.uid()
  if (elem.$) {
    const target = get(tree, elem.$)
    if (target && target._) {
      return target._[uid]
    }
  } else {
    return tree._[uid]
  }
}
