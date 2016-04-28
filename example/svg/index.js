'use strict'
console.time('START')
const State = require('vigour-state')
const Element = require('../../lib/element')
const render = require('../../lib/render')
// -------------------------
require('../style.css')
// -------------------------
const raf = window.requestAnimationFrame
const isNumber = require('vigour-util/is/number')
const svgNS = 'http://www.w3.org/2000/svg'
// -------------------------
const state = global.state = new State({ name: 'trees' })
const obj = {}
const amount = 1e3
for (let i = 0; i < amount; i++) { obj[i] = { i: i } }
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
// -------------------------
const app = new Element({
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
    holder2: {
      $: 'collection',
      $any: true,
      css: null,
      namespace: svgNS,
      node: 'svg',
      props: {
        width: 1000,
        height: 1000
      },
      Child: {
        namespace: svgNS,
        node: 'circle',
        css: null,
        props: {
          cx: {
            $: 'i',
            $transform (val) { return Math.sin(val / 30) * (val / 2) + 250 }
          },
          cy: {
            $: 'i',
            $transform (val) { return Math.cos(val / 30) * (val / 2) + 250 }
          },
          r: { $: 'i', $transform (val) { return val / 50 + 1 } },
          'stroke-width': 1,
          fill: 'red',
          stroke: 'black'
        }
      }
    }
  }
}, false)

console.timeEnd('START')

setTimeout(function () {
  var ms = Date.now()
  document.body.appendChild(render(app, state))
  state.set({ first: Date.now() - ms })
  var cnt = 0
  var total = 0
  function loop () {
    cnt++
    var ms = Date.now()
    var obj = {}
    for (var i = 0; i < amount; i++) {
      obj[i] = { i: i + cnt }
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
  loop()
  console.log('----------------------------')
  state.set({ elems: document.getElementsByTagName('*').length })
})
