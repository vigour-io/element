'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s({
  greeting: 'hello',
  cat: 'http://loremflickr.com',
  field: '\nfield',
  fields: {
    a: {
      b: 'a/b'
    },
    c: {
      b: 'c/b'
    },
  },
  collection: [
    { b: '0/b' },
    {
      b: '1/b',
      list: {
        a: { text: 'b/1/nested/a' },
        b: { text: 'b/1/nested/b' }
      }
    },
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
      $: 'fields.a',
      Child: { type: 't' },
      t: {},
      t2: {},
      t3: {},
      t4: { $: false, val: 'static' }
    },
    cat: {
      node: 'img',
      class: 'basic-item whitefilter',
      props: {
        components: {
          greeting: {
            $: 'greeting',
            $transform (val) {
              return (val !== this && val !== true && val) || 'greetings!'
            }
          },
          cat: {
            $: 'cat',
            $add: {
              val: '/100/100',
              $add () { return '?' + Math.random() }
            },
            name: 'src'
          }
        },
        properties: {
          greeting: { type: 'greeting' },
          cat: { type: 'cat' },
          largeCat: {
            type: 'cat',
            $add: '/500/500'
          }
        },
        greeting: true,
        cat: true,
        otherGreeting: { type: 'greeting' },
        staticGreeting: { type: 'greeting', $: false, val: 'gutten morgen' }
      }
    },
    collection: {
      class: 'complex-item fill',
      title: { text: 'collection' },
      $: 'collection.$any',
      Child: {
        class: 'complex-item',
        title: { text: { $: 'b' } },
        nested: {
          $: 'list.$any',
          Child: {
            class: 'basic-item',
            text: { $: 'text' }
          }
        },
        footer: {
          symbol: {}
        }
      }
    }
  },
  propsholder: {
    title: { text: 'props' },
    props: {
      haha: 'ha!',
      yuzi: { $: 'field' }
    },
    first: { type: 'cat' },
    second: {
      type: 'cat',
      props: {
        cat: null,
        largeCat: true
      }
    },
    third: { type: 'cat' }
  },
  elems: {
    title: { text: 'elements' },
    other2: { type: 'other', $: 'fields.c' },
    other: { type: 'other' }
  },
  collections: {
    title: { text: 'collections' },
    collection: { type: 'collection' }, // this is def wrong
    text: { $: 'field' },
    collection2: { type: 'collection' } // this is def wrong
  }
}, state))

state.greeting.set('bye')
