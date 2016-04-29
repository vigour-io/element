'use strict'
// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const render = require('../../lib/render')
// -------------------------
const s = require('vigour-state/s')
// -------------------------

const elem = {
  key: 'app',
  style:{
    transform:{
      x: 200,
      y: 200
    }
  },
  holder: {
      $: 'one',
      text: 'make everything!',
      style: {
        transform: {
          type: 'group',
          y: { $: 'y' },
          x: { $: 'x' },
          scale: { $: 'scale' },
          rotate: { $: 'rotate' }
        }
      }
  }
}

const state = s({
  one:{
    y: 10,
    x: 30,
    scale:1,
    rotate: 1
  }
})

document.body.appendChild(render(elem, state))

const raf = window.requestAnimationFrame
let x = 0
function loop () {
  raf(function () {
    state.one.set({
      y: Math.sin(x++ / 10) * 10,
      x: Math.sin(x++ / 10) * 10,
      scale: Math.sin(x++ / 100) * 5,
      rotate: Math.sin(x++ / 10) * 10
    })
    loop()
  })
}

loop()
