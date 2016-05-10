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
  holder: {
    $: 'thing',
    components: {
      face: {
        text: 'check it',
        class: {
          $: 'breakme'
          // 'other-name': {
          //   $: 'one'
          // },
          // dont: {
          //   $: 'breakme'
          // }
        }
      }
    },
    first: {
      type: 'face'
    },
    second: {
      type: 'face',
      class: {}
    },
    third: {
      type: 'face'
    }
  }
}

const state = s({
  thing:{
    one: true,
    breakme: 'not-this-name'
  },
})

document.body.appendChild(render(elem, state))