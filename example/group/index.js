'use strict'
console.clear()
require('../style.css')
const s = require('vigour-state/s')
const Element = require('../../lib/element')
const render = require('../../lib/render')
// -------------------------
const raf = window.requestAnimationFrame
const isNumber = require('vigour-util/is/number')
// -------------------------
const state = s()
const obj = {}
const amount = 5
// -------------------------
for (var i = 0; i < amount; i++) { obj[i] = { x: i, y: i * 2 } }
state.set({ collection: obj, ms: {} })
// // -------------------------
var app = {
  key: 'app',
  info: {
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
  text: 'hello app',
  holder: {
    $: 'collection',
    $any: true,
    Child: {
      text: 'its child!',
      coordinates: {
        type: 'group',
        render (state) {
          console.log('fire coordinates -->', this.inspect(), state.path())
        },
        x: {
          $: 'x',
          render (state) {
            console.log('fire x -->', state && state.inspect())
          }
        },
        y: {
          $: 'y',
          render (state) {
            console.log('fire y -->', state && state.inspect())
          }
        }
      }
    }
  }
}

console.timeEnd('START')
setTimeout(function () {
  // reuse this piece a bit
  var ms = Date.now()
  document.body.appendChild(render(app, state))
  state.set({ first: Date.now() - ms })
  // -------------------------
  // var cnt = 0
  // var total = 0
  // function loop () {
  //   cnt++
  //   var ms = Date.now()
  //   var obj = {}
  //   for (var i = 0; i < amount; i++) {
  //     obj[i] = { x: i + cnt, y: i * cnt }
  //   }
  //   state.collection.set(obj)
  //   if (!state.first) {
  //     state.set({ first: Date.now() - ms })
  //   } else {
  //     total += (Date.now() - ms)
  //     state.ms.set(total / cnt)
  //   }
  //   raf(loop)
  // }
  // loop()
  state.set({ elems: document.getElementsByTagName('*').length })
})
