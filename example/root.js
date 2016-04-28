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
    bla: {
      $: 'c',
      text: { $: 'd' }
    }
  }
})

document.body.appendChild(render(app, state, 'dom', function (type) {
  console.log('lulzzz', type, this.path())
}))
