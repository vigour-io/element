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
          forcechanged (data) {
            console.log('force changed')
          },
          forcedown (data) {
            console.log('force down')
          },
          forceup (data) {
            console.log('force up')
          },
          rightclick (data) {
            console.log('rightclick!')
          },
          drag (data) {
            data.state.title.set(data.x - data.startX)
          }
        }
      }
    }
  }
}

const data = {}
let n = 1

data.collection = {}

while (n--) data.collection[n] = {title: '0'}

const state = s(data)

document.body.appendChild(render(elem, state))
