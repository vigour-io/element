'use strict'
console.clear()
require('../style.css')
const State = require('vigour-state')
const Element = require('../../lib/element')
const render = require('../../lib/render')
const s = new State({
  key: 'STATE',
  a: {
    b: 'its a.b'
  },
  c: {
    d: {
      e: 'e'
    }
  }
  // b: 'its root.b'
})

const app = new Element({
  key: 'app',
  text: 'hello',
  a: {
    $: 'a',
    b: {
      // text: { $: 'c.d.e' }
      // something extra funky going on with root...
      text: { $: '$root.b' }
      // $: 'b.$root.b'
    }
  }
})

// const app = new Element({ text: 'hello' })
document.body.appendChild(render(app, s, 'dom', function (type, stamp, subs, tree) {
  console.log('FIRE FIRE', this.path(), type, stamp, tree)
  // 2 times A never root?
}))

s.set({ b: 'hello its root b!' })

s.c.d.e.set('hello its e!')
