'use strict'
require('../style.css')
const s = require('vigour-state/s')
// https://github.com/Matt-Esch/virtual-dom/issues/371 <-- hahahaha! wining all
console.time('START')
// -------------------------
const raf = window.requestAnimationFrame
const isNumber = require('vigour-util/is/number')
// -------------------------
const state = s({ name: 'trees' })
const obj = {}
const amount = 2500
// -------------------------
for (var i = 0; i < amount; i++) { obj[i] = { title: i } }
state.set({
  collection: obj,
  ms: {
    $transform (val) {
      return isNumber(val) ? Math.round(val) : 'not measured'
    },
    $add: ' ms'
  },
  settings: {}
})
// // -------------------------
const Element = require('../../lib/element')

var app = new Element({
  key: 'app',
  holder: {
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
  },
  main: {
    holder3: {
      $: 'collection',
      $any: true,
      Child: {
        class: 'weirdChild',
        text: { $: 'title' }
      }
    }
  }
}, false)

var render = require('../../lib/render')
var tree = { parent: true }
console.timeEnd('START')
setTimeout(function () {
  var ms = Date.now()
  document.body.appendChild(render(app, state))
  state.set({ first: Date.now() - ms })
  // -------------------------
  var cnt = 0
  var total = 0
  function loop () {
    cnt++
    var ms = Date.now()
    var obj = {}
    for (var i = 0; i < amount; i++) {
      obj[i] = { title: i + cnt }
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
