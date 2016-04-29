'use strict'
console.clear()
require('../style.css')
const render = require('../../lib/render')
const state = { collection: {} }
const amount = 5

for (var i = 0; i < amount; i++) { state.collection[i] = { x: i, y: i * 2 } }
document.body.appendChild(render({
  key: 'app',
  text: 'hello app',
  holder: {
    $: 'collection',
    $any: true,
    Child: {
      text: 'its child!',
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
