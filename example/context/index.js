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
      first: { $: 'a', class: 'nested', b: { c: { text: { $: 'first' } } } },
      second: { $: 'b', class: 'nested', b: { c: { text: { $: 'second' } } } },
      title: { text: 'context' },
      subtitle: { text: 'static & state order' },
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
      title: { text: 'no context' },
      first: { $: 'a', class: 'nested', b: { c: { text: { $: 'first' } } } },
      second: { $: 'b', class: 'nested', b: { c: { text: { $: 'second' } } } }
    }
  },
  holder3: {
    class: 'holder',
    rowA: {
      class: 'complex-item',
      symbol: {},
      title: { text: 'no context' },
      subtitle: { text: 'path subscription' },
      first: { class: 'basic-item', $: 'a.first', text: 'first' },
      second: { class: 'basic-item', $: 'b.second', text: 'second' }
    }
  }
}, state))

state.title.set('third')
state.set({ b: { second: 'second' } })
state.set({ a: { first: 'first' } })
