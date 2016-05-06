'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s({
  greeting: 'hello',
  field: 'field',
  a: {
    b: 'a/b'
  },
  c: {
    b: 'c/b'
  },
  collection: [
    { b: '0/b' },
    { b: '1/b' },
    { b: '2/b' }
  ]
})

document.body.appendChild(render({
  text: 'context',
  key: 'app',
  Child: { class: 'holder' },
  components: {
    t: {
      type: 'text',
      $: 'b',
      $transform (val) { return ` ${val} ` }
    },
    other: {
      class: 'basic-item',
      $: 'a',
      Child: { type: 't' },
      t: {},
      t2: {},
      t3: {},
      t4: { $: false, val: 'static' }
    },
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
    },
    collection: {
      class: 'complex-item',
      title: { text: 'collection' },
      $any: true,
      $: 'collection',
      Child: { text: { $: 'b' } } // this is def broken
      // Child: { type: 'other', $: false }
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
  },
  // elems: {
  //   title: { text: 'elements' },
  //   other2: { type: 'other', $: 'c' },
  //   other: { type: 'other' }
  // },
  collections: {
    title: { text: 'collections' },
    collection: { type: 'collection' } // this is def wrong
    // collection2: { type: 'collection' },
    // collection3: { type: 'collection' }
  }
}, state, (state, type, stamp, tree, subs, sType) => {
  // pass app, rState, rTree
  console.log('%cFIRE', 'color: white;background-color: #333; padding: 2px;', state.path().join('/'), ' - ', type, ' - ', sType || 'normal', '\n\n')
}))

console.log(document.body.children[2].children[0].children[1])
state.greeting.set('bye')
console.log(document.body.children[2].children[0].children[1])

console.log('yo subs', subs)

function logger (a) {
  for (var i = 0 ; i < a.length; i += 3) {
    console.log(a[i] + ' : ' + a[i + 2].path().join('/'))
  }
}
logger(subs._.ta)
// logger(subs.greeting._.ta)

// state.c.b.set('c-b')

// state.field.remove()
// console.log(document.body.children[2].children[0])
// props
// then group
// then style
// then transform
