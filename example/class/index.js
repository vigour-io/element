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
  components: {
    thingy: {
      nested: {
        text: 'thingy.nested',
        class: {
          'my-name': {
            $: 'one'
          },
          'not-this-name': true
        }
      }
    }
  },
  first: {
    type: 'thingy',
    $: 'thing'
  },
  second: {
    type: 'thingy',
    $: 'thing2'
  },
  third: { type: 'thingy' }
}

const state = s({
  thing:{
    one: true,
    two: true,
    three: false
  },
  thing2:{
    one: false,
    two: true,
    three: false
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
