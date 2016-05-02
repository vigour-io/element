'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s({ title: 'dynamic text' }, false)

const benchmark = require('../benchmark')

document.body.appendChild(render({
  key: 'app',
  text: 'context',
  components: {
    item: {
      class: 'complex-item',
      title: { text: 'static text' },
      nested: { b: { c: { text: { $: 'title' } } } },
      symbol: {},
      symbol2: {
        class: 'symbol',
        order: -1
      }
    }
  },
  holder: {
    rowA: { type: 'item' },
    rowB: { type: 'item' }
  }
}, state))

state.title.set('dynamic text updated')

console.log(window.steps)
