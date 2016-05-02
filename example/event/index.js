'use strict'
require('../style.css')
const s = require('vigour-state/s')

const render = require('../../lib/render')
const elem = {
  key: 'app',
  holder: {
    $: 'collection',
    $any: true,
    Child: {
      big: {
        text: {
          $: 'title'
        },
        on: {
          drag (data) {
            console.log('drag!!!')
            data.state.title.set(data.state.title.val + '.')
          }
        }
      }
    }
  }
}

const data = {}
let n = 1

data.collection = {}

while (n--) data.collection[n] = {title: n}

const state = s(data)

document.body.appendChild(render(elem, state))
