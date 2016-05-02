'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s({ title: ' this is the title!' }, false)
document.body.appendChild(render({
  key: 'app',
  text: 'context',
  components: {
    row: {
      class: 'row',
      title: { text: '🕊' },
      a: { b: { c: { text: { $: 'title' } } }}
    }
  },
  rowA: { type: 'row' },
  rowB: { type: 'row' }
}, state))

state.title.set('hahaxxxxxxxxxxxxxxxxxx')
