'use strict'
console.clear()
require('../style.css')
const State = require('vigour-state')
const render = require('../../lib/render')
const s = new State({
  key: 'STATE',
  c: {
    val: 'bla',
    d: {
      e: 'e'
    }
  }
})

const app = {
  key: 'app',
  text: 'hello',
  a: {
    $: 'a',
    b: {
      text: { $: '$root.b' },
      c: {
        text: { $: '$root.c', $prepend: 'a.b.c: ' }
      }
    }
  },
  holder: {
    $any: true,
    $: 'collection',
    Child: {
      text: { $: '$root.c' }
    }
  }
}

// const app = new Element({ text: 'hello' })
document.body.appendChild(render(app, s, function (state, type, stamp, subs, tree) {
  console.error('FIRE:', state.path(), type, stamp, tree)
}))

console.log('\n\nCREATE ROOT:')
s.set({ b: 'hello its root b!' })

// s.c.d.e.set('hello its e!')
console.log('\n\nUPDATE ROOT:')
s.set({ b: 'hello its root b!xxxxxxxxxxxxx' })

console.log('\n\nUPDATE ROOTxxx:')

// s.set({ b: 'yuzi!' })

s.set({ c: 'james' })
s.set({ a: {} })

s.set({
  collection: [1, 2, 3, 4]
})

console.log('\n\n\nupdate YUZ')
// shit shit shit <--- root in colleciton wrong!!!!
s.c.set('yuz')

console.log('\n\n\nupdate BLURF')

s.c.set('blurf')
