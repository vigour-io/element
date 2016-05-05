'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s({ greeting: 'hello', field: 'field' })

document.body.appendChild(render({
  text: 'context',
  key: 'app',
  Child: { class: 'holder' },
  components: {
    propsElem: {
      props: {
        components: {
          greeting: {
            $: 'greeting',
            $transform (val) {
              return (val !== this && val !== true && val) || 'hahaha'
            }
          }
        },
        properties: {
          // when making into context goes wrong (makes sense)
          greeting: { type: 'greeting' }
        },
        greeting: true,
        otherGreeting: { type: 'greeting' },
        staticGreeting: { type: 'greeting', $: false, val: 'gutten morgen' }
      }
    }
  },
  propsholder: {
    title: { text: 'props' },
    a: { type: 'propsElem' }
    // components: {
    //   a: { $: 'greeting' }
    // },
    // a: { type: 'a' },
    // b: { type: 'a', $: 'field' },
    // c: { type: 'a', $: false }
  }
}, state, (state, type, stamp, tree, subs, sType) => {
  // pass app, rState, rTree
  console.log('%cFIRE', 'color: white;background-color: #333; padding: 2px;', state.path().join('/'), ' - ', type, ' - ', sType || 'normal', '\n\n')
}))

console.log(document.body.children[2].children[0].children[1])
state.greeting.set('bye')
console.log(document.body.children[2].children[0].children[1])
// state.field.remove()
// console.log(document.body.children[2].children[0])
// props
// then group
// then style
// then transform
