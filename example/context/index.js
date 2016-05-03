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
      win: { $: 'a', class: 'nested', b: { c: { text: { $: 'win' } } } },
      lose: { $: 'b', class: 'nested', b: { c: { text: { $: 'lose' } } } },
      title: { text: 'context' },
      subtitle: { text: 'static subtitle' },
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
  },
  holder2: {
    class: 'holder',
    rowA: {
      class: 'complex-item',
      symbol: {},
      title: { text: 'non context' },
      noContextWin: { $: 'a', class: 'nested', b: { c: { text: { $: 'win' } } } },
      noContextLose: { $: 'b', class: 'nested', b: { c: { text: { $: 'lose' } } } }
    }
  }
}, state))

state.title.set('dynamic text updated')
state.set({ b: { lose: 'lose' } })
state.set({ a: { win: 'win' } })
