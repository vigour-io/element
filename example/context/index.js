'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s({ title: 'dynamic text' }, false)

document.body.appendChild(render({
  components: {
    basic: {
      class: 'basic-item',
      Child: { class: 'basic-item' },
      first: { text: { $: 'first.text' } },
      second: { text: 'static-second' }
    },
    complex: {
      class: 'complex-item',
      first: {
        $: 'first', class: 'nested',
        b: {
          c: {
            text: { $: 'text' },
            field: { text: 'static-second' }
          }
        }
      },
      second: {
        $: 'second',
        class: 'nested',
        b: {
          c: {
            text: { $: 'text' }
          }
        }
      },
      title: { text: 'context' },
      subtitle: { text: 'static & state order' },
      nested: {
        b: {
          c: { text: { $: 'title' } }
        }
      },
      symbol: {},
      symbol2: {
        class: 'symbol',
        order: -1
      }
    }
  },
  key: 'app',
  text: 'context',
  Child: { class: 'holder' },
  bla: {
    $: 'first.text'
  },
  // holder: [
  //   // { type: 'basic' },
  //   // { type: 'basic' }
  // ],
  // holder2: [
  //   // { type: 'complex' },
  //   // { type: 'complex' }
  // ],
  updateText: {
    class: 'basic-item',
    text: 'update all text',
    on: {
      click (data) {
        function updateText (state) {
          if (state.val) {
            const split = state.val.split(' ')
            state.set(split[0] + ' ' + Math.round(Math.random() * 9999))
          }
          state.each(updateText)
        }
        updateText(state)
      }
    }
  },
  // toggle: {
  //   class: 'basic-item',
  //   text: {
  //     $: 'first.text',
  //     $transform (val) {
  //       return !val ? 'add first' : 'remove ' + val
  //     }
  //   },
  //   on: {
  //     click (data) {
  //       state.set({ first: state.first ? null : { text: 'first' } })
  //     }
  //   }
  // },
  // holder2: {
  //   rowA: {
  //     class: 'complex-item',
  //     symbol: {},
  //     title: { text: 'no context' },
  //     first: { $: 'first', class: 'nested', b: { c: { text: { $: 'text' } } } },
  //     second: { $: 'second', class: 'nested', b: { c: { text: { $: 'text' } } } }
  //   },
  //   rowB: {
  //     class: 'complex-item',
  //     symbol: {},
  //     title: { text: 'no context' },
  //     subtitle: { text: 'path subscription' },
  //     first: { class: 'basic-item', $: 'first.text', text: 'first' },
  //     second: { class: 'basic-item', $: 'second.text', text: 'second' }
  //   },
  //   rowC: {
  //     class: 'complex-item',
  //     symbol: {},
  //     title: { text: 'no context' },
  //     subtitle: { text: 'mixed subscription' },
  //     first: { class: 'basic-item', $: 'first', text: 'first' },
  //     second: { class: 'basic-item', $: 'second.text', text: 'second' }
  //   }
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
  // }
}, state, (state, type, stamp, tree, subs, sType) => {
  console.log('%cFIRE', 'color: white;background-color: #333; padding: 2px;', state.path().join('/'), ' - ', type, ' - ', sType || 'normal', '\n\n')
}))

state.title.set('third')
state.set({ second: { text: 'second' } })
state.set({ first: { text: 'first' } })
// state.set({ rootspawner: {} })
