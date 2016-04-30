'use strict'
console.clear() // do this in budo
require('../style.css')
const render = require('../../lib/render')
const state = { collection: {} }
const amount = 1

for (var i = 0; i < amount; i++) {
  state.collection[i] = {
    x: i,
    y: i * 2,
    title: i
  }
}

document.body.appendChild(render({
  key: 'app',
  text: 'hello app',
  holder: {
    $: 'collection',
    $any: true,
    Child: {
      text: { $: 'title' },
      coordinates: {
        type: 'group',
        render (state) {
          console.log('fire coordinates -->', this.inspect(), state.path())
        },
        x: {
          $: 'x',
          render (state) {
            console.log('fire x -->', state && state.inspect())
          }
        },
        y: {
          $: 'y',
          render (state) {
            console.log('fire y -->', state && state.inspect())
          }
        }
      }
    }
  }
}, state))
