'use strict'
require('./benchmark.css')
const render = require('../lib/render')
const State = require('vigour-state')
const isNumber = require('vigour-util/is/number')
const raf = window.requestAnimationFrame

exports.ui = {
  class: { shiftdown: true },
  benchmark: {
    init: {
      text: { $: 'first', $add: ' ms initial render' }
    },
    ms: {
      text: {
        $: 'ms',
        $transform (val) {
          return isNumber(val) ? Math.round(val) : 'not measured'
        },
        $add: ' ms periodic updates'
      }
    },
    elems: {
      text: { $: 'elems', $add: ' dom-nodes' }
    }
  }
}

exports.init = function (amount, app, method, update) {
  app.inject = exports.ui
  var state = { collection: {}, ms: {} }
  for (let i = 0; i < amount; i++) {
    state.collection[i] = method(i, 0)
  }
  state = new State(state, false)
  if (update) { update(state, 0) }
  // init measure
  var ms = Date.now()
  document.body.appendChild(render(app, state))
  state.set({ first: Date.now() - ms })
  return state
}

exports.loop = function (amount, app, method, update) {
  setTimeout(function () {
    const state = exports.init(amount, app, method, update)
    var cnt = 0
    var total = 0
    function loop () {
      cnt++
      var ms = Date.now()
      if (!update) {
        var obj = {}
        for (let i = 0; i < amount; i++) {
          obj[i] = method(i, cnt)
        }
        state.collection.set(obj)
      } else {
        update(state, cnt, amount)
      }
      if (!state.first) {
        state.set({ first: Date.now() - ms })
      } else {
        total += (Date.now() - ms)
        state.ms.set(total / cnt)
      }
      raf(loop)
    }
    // state.collection[0].remove()
    loop()
    state.set({ elems: document.getElementsByTagName('*').length })
  })
}
