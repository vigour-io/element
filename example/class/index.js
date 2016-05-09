'use strict'
require('../style.css')
require('./style.css')
// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const render = require('../../lib/render')
// -------------------------
const s = require('vigour-state/s')
// -------------------------

const elem = {
  key: 'app',
  one: {
    text: 'my-name other-name',
    class: 'my-name other-name'
  },
  two: {
    text: 'my-name other-name',
    class: {
      'my-name': true,
      'other-name': true,
      'not-this-name': false
    }
  },
  three: {
    text: 'my-name other-name',
    class: {
      name: 'my-name',
      other: 'other-name'
    }
  },
  four: {
    $: 'thing',
    text: 'four: my-name other-name',
    class: {
      'my-name': {
        $: 'one'
      },
      'other-name': {
        $: 'two'
      },
      'not-this-name': {
        $: 'three'
      }
    }
  }
}

const state = s({
  thing:{
    one: true,
    two: true,
    three: true
  }
})

document.body.appendChild(render(elem, state))

// console.log('---------')
// state.thing.three.set(true)

// const raf = window.requestAnimationFrame
// const thing = state.thing
// function loop () {
//   raf(function () {
//     thing.set({
//       one: !thing.one.val,
//       two: !thing.two.val,
//       three: !thing.three.val
//     })
//     loop()
//   })
// }

// loop()
