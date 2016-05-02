'use strict'
require('../style.css')
const render = require('../../lib/render')
const s = require('vigour-state/s')
const state = s({
  title: 'fml'
}, false)

document.body.appendChild(render({
  key: 'app',
  text: 'context',
  components: {
    fml: {
      haha: {
        $: 'fuck',
        text: 'haha first'
      },
      hoho: {
        $: 'title',
        text: 'hoho second'
      }
    }
  },
  holder: {
    one: {
      type: 'fml'
    },
    two: {
      type: 'fml'
    }
  }
}, state))

state.set({
  fuck: 'it'
})
