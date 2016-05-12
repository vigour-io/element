'use strict'
const renderMultiple = require('./multiple')
const subscribe = require('vigour-state/subscribe')
const State = require('vigour-state')
const Element = require('../element')
const get = require('lodash.get')
const set = require('lodash.set')

module.exports = function render (elem, state, callback) {
  if (!(elem instanceof Element)) {
    elem = new Element(elem, false)
  }
  const subs = elem.$map()
  const tree = {}

  console.log('subs:', subs)

  if (state === void 0) {
    renderMultiple(state, 'new', 0, subs, tree)
  } else {
    if (!(state instanceof State)) {
      state = new State(state, false)
    }
    renderMultiple(state, 'new', state._lstamp, subs, tree)
    if (callback) {
      callback(state, 'new', state._lstamp, subs, tree, void 0, elem, state, subs)
      subscribe(state, subs, function (state, type, stamp, nsubs, tree, sType) {
        renderMultiple(state, type, stamp, nsubs, tree, sType)
        callback(state, type, stamp, nsubs, tree, sType, elem, state, subs)
      }, tree)
    } else {
      subscribe(state, subs, renderMultiple, tree)
    }
  }
  const uid = elem.uid()

  if (elem.$) {
    let target
    // needs a test
    if (elem.isCollection || elem.isSwitcher) {
      target = get(tree, elem.$.slice(0, -1))
    } else {
      target = get(tree, elem.$)
    }

    if (!target) {
      // create target on state (to do a first render)
      const obj = {}
      set(obj, elem.$, {})
      state.set(obj)
      target = get(tree, elem.$)
    }
    return target._[uid]
  } else {
    return tree._[uid]
  }
}
