'use strict'
const render = require('../lib/render')
const State = require('vigour-state')
const isNumber = require('vigour-util/is/number')
const raf = window.requestAnimationFrame

exports.ui = {
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

exports.loop = function (amount, app, method) {
  setTimeout(function () {
    app.benchmark = exports.ui
    var state = { collection: {}, ms: {} }
    var cnt = 0
    var total = 0
    for (let i = 0; i < amount; i++) {
      state.collection[i] = method(i, cnt)
    }
    state = new State(state)
    // init measure
    var ms = Date.now()
    document.body.appendChild(render(app, state))
    state.set({ first: Date.now() - ms })

    // loop
    function loop () {
      cnt++
      var ms = Date.now()
      var obj = {}
      for (let i = 0; i < amount; i++) {
        obj[i] = method(i, cnt)
      }
      state.collection.set(obj)
      if (!state.first) {
        state.set({ first: Date.now() - ms })
      } else {
        total += (Date.now() - ms)
        state.ms.set(total / cnt)
      }
      raf(loop)
    }
    state.collection[0].remove()
    loop()
    state.set({ elems: document.getElementsByTagName('*').length })
  })
}
