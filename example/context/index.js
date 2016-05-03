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
  // holder: {
  //   rowA: { type: 'item' },
  //   rowB: { type: 'item' }
  // },
  holder2: {
    class: 'holder',
    rowA: {
      class: 'complex-item',
      symbol: {},
      title: { text: 'no context' },
      first: { $: 'a', class: 'nested', b: { c: { text: { $: 'first' } } } },
      second: { $: 'b', class: 'nested', b: { c: { text: { $: 'second' } } } }
    },
    rowB: {
      class: 'complex-item',
      symbol: {},
      title: { text: 'no context' },
      subtitle: { text: 'path subscription' },
      first: { class: 'basic-item', $: 'a.first', text: 'first' },
      second: { class: 'basic-item', $: 'b.second', text: 'second' }
    },
    rowC: {
      class: 'complex-item',
      symbol: {},
      title: { text: 'no context' },
      subtitle: { text: 'mixed subscription' },
      first: { class: 'basic-item', $: 'a', text: 'first' },
      second: { class: 'basic-item', $: 'b.second', text: 'second' }
    }
    // rowD: {
    //   $: 'rootspawner',
    //   class: 'complex-item',
    //   symbol: {},
    //   title: { text: 'no context' },
    //   subtitle: { text: 'root subscription' },
    //   // now this does nto fire... on remove
    //   // and fires one to may after the remove for b
    //   first: { class: 'basic-item', $: '$root.a.first', text: 'first' },
    //   second: { class: 'basic-item', $: '$root.b.second', text: 'second' }
    // }
  }
}, state, (state, type, stamp, tree, subs, sType) => {
  console.log('\nFIRE:', state.path().join('/'), ' - ', type, ' - ', sType || 'normal')
}))

state.title.set('third')
state.set({ b: { second: 'second' } })
state.set({ a: { first: 'first' } })
// state.set({ rootspawner: {} })

console.error('\nREMOVE!')
// context removal is still broken
// state.set({ a: null })
