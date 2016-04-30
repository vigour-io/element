'use strict'
require('../style.css')
// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const render = require('../../lib/render')
// -------------------------
const s = require('vigour-state/s')
// -------------------------

const elem = {
  key: 'app',
  style:{
    transform:{
      x: 300,
      y: 300
    }
  },
  holder: {
    class: 'weirdChild',
    $: 'one',
    text: 'make everything!',
    style: {
      transform: {
        y: { $: 'y' },
        x: { $: 'x' },
        scale: { $: 'scale' },
        rotate: 45//{ $: 'rotate' }
      }
    }
  }
}

const state = s({
  one:{
    rotate: 1,
    scale:1,
    y: 10,
    x: 30
  }
})

document.body.appendChild(render(elem, state))

const raf = window.requestAnimationFrame
let x = 0
function loop () {
  raf(function () {
    state.one.set({
      y: Math.sin(x++ / 10) * 50,
      x: Math.sin(x++ / 10) * 50,
      scale: Math.sin(x++ / 100) * 5,
      rotate: Math.sin(x++ / 10) * 10
    })
    loop()
  })
}

loop()
