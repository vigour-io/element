'use strict'
const State = require('vigour-state')
// give elem a render method? perhaps? -- or when you pass something like a dom node?
const Element = require('../lib/element')
const render = require('../lib/render')

const state = new State({
  a: 'hello a',
  b: {}
})

const app = new Element({
  text: 'hello',
  field: {
    $: 'b',
    text: { $: '$root.a' }
  }
})

document.body.appendChild(render(app, state))
