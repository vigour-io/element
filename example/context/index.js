'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s({ greeting: 'hello' })

document.body.appendChild(render({
  text: 'context',
  key: 'app',
  Child: { class: 'holder' },
  propsElem: {
    title: { text: 'props' },
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
        hello: { type: 'greeting' }
      },
      hello: true,
      bye: { type: 'greeting', $: false }
    }
  }
}, state, (state, type, stamp, tree, subs, sType) => {
  console.log('%cFIRE', 'color: white;background-color: #333; padding: 2px;', state.path().join('/'), ' - ', type, ' - ', sType || 'normal', '\n\n')
}))

console.log(document.body.children[2].children[0])

// props
// then group
// then style
// then transform
