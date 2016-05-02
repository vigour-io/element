'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s({ title: 'dynamic text' }, false)
document.body.appendChild(render({
  key: 'app',
  text: 'context',
  components: {
    row: {
      class: 'row',
      title: { text: 'static text' },
      field: { b: { c: { text: { $: 'title' } } } }
    }
  },
  holder: {
    rowA: { type: 'row' },
    rowB: { type: 'row' }
  }
}, state))

state.title.set('dynamic text updated')
