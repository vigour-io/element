'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s({ title: 'dynamic text' }, false)
document.body.appendChild(render({
  key: 'app',
  text: 'context',
  components: {
    item: {
      class: 'complex-item',
      title: { text: 'static text' },
      nested: { b: { c: { text: { $: 'title' } } } }
    }
  },
  holder: {
    rowA: { type: 'item' },
    rowB: { type: 'item' }
  }
}, state))

state.title.set('dynamic text updated')
