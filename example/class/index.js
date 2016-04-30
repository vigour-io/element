'use strict'
require('../style.css')
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
    $: 'one',
    text: 'my-name other-name',
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
  one:{
    css: 'my-name',
    one: true,
    two: true,
    three: false
  }
})

document.body.appendChild(render(elem, state))

const raf = window.requestAnimationFrame
const one = state.one
function loop () {
  raf(function () {
    one.set({
      one: !one.one.val,
      two: !one.two.val,
      three: !one.three.val
    })
    loop()
  })
}

loop()
