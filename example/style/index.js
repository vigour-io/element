'use strict'
// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const render = require('../../lib/render')

const elem = {
  key: 'app',
  holder: {
      $: 'one',
      text: 'everything!',
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

const state = {
  one:{
    y: 100,
    x: 300,
    scale: 3,
    rotate: 45
  }
}

document.body.appendChild(render(elem, state))