'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s()
// { title: 'dynamic text' }, false

document.body.appendChild(render({
  components: {
    basic: {
      class: 'basic-item',
      Child: { class: 'basic-item' },
      first: {
        $: 'first',
        text: { $: 'text' },
        bottom: { type: 'text', val: ' | static-second |' }
      },
      second: { text: 'static-second' }
    },
    complex: {
      class: 'complex-item',
      first: {
        $: 'first',
        class: 'nested',
        a: {
          Child: { class: 'basic-item' },
          dynamic: { text: { $: 'text' } },
          static: {
            text: 'static-second',
            on: {
              click (e) {
                console.log('--->', e)
                e.target.style.border = '1px solid red'
                setTimeout(() => {
                  e.target.style.border = 'inherit'
                }, 100)
              }
            }
          }
        }
      },
      second: {
        $: 'second',
        class: 'nested',
        a: {
          a: { text: { $: 'text' } }
        }
      },
      title: { text: 'context' },
      subtitle: { text: 'static & state order' },
      nested: {
        a: {
          a: { text: { $: 'title' } }
        }
      },
      symbol: {},
      symbol2: {
        class: 'symbol',
        order: -1
      }
    }
  },
  text: 'context',
  key: 'app',
  Child: { class: 'holder' },
  properties: { texts: { Child: { type: 'text' } } },
  texts: [ '-', { $: 'first.text' }, '-' ],
  // holder: [
  //   { type: 'basic' },
  //   { type: 'basic' }
  // ],
  holder2: [
    { type: 'complex' },
    { type: 'complex' }
  ],
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
  toggle: {
    class: 'basic-item',
    text: {
      $: 'first.text',
      $transform (val) {
        return !val ? 'add first' : 'remove ' + val
      }
    },
    on: {
      click (data) {
        state.set({ first: state.first ? null : { text: 'first' } })
      }
    }
  }
  // holder3: [
  //   {
  //     class: 'complex-item',
  //     symbol: {},
  //     title: { text: 'no context' },
  //     first: { $: 'first', class: 'nested', b: { c: { text: { $: 'text' } } } },
  //     second: { $: 'second', class: 'nested', b: { c: { text: { $: 'text' } } } }
  //   },
  //   {
  //     class: 'complex-item',
  //     symbol: {},
  //     title: { text: 'no context' },
  //     subtitle: { text: 'path subscription' },
  //     first: { class: 'basic-item', $: 'first.text', text: 'first' },
  //     second: { class: 'basic-item', $: 'second.text', text: 'second' }
  //   },
  //   {
  //     class: 'complex-item',
  //     symbol: {},
  //     title: { text: 'no context' },
  //     subtitle: { text: 'mixed subscription' },
  //     first: { class: 'basic-item', $: 'first', text: 'first' },
  //     second: { class: 'basic-item', $: 'second.text', text: 'second' }
  //   }
  // ]
}, state, (state, type, stamp, tree, subs, sType) => {
  console.log('%cFIRE', 'color: white;background-color: #333; padding: 2px;', state.path().join('/'), ' - ', type, ' - ', sType || 'normal', '\n\n')
}))

// state.title.set('third')
// state.set({ second: { text: 'second' } })
state.set({ first: { text: 'first' } })

console.log('-----remove first------')
state.set({ first: null })

console.log('----reset first-------')
state.set({ first: { text: 'haha' } })
// state.set({ rootspawner: {} })

// HAS TO BE DONE BY TMRW!
// ROOT
// {
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
