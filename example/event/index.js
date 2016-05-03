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
          // click (data) {
          //   console.log(data)
          //   data.state.title.set('click!')
          // },
          // hover (data) {
          //   console.log(data)
          //   data.state.title.set('hover!')
          // },
          // forcechanged (data) {
          //   console.log(data)
          //   data.state.title.set('force changed')
          // },
          touchstart (data) {
            data.state.title.set('touch start')
          },
          touchend (data) {
            data.state.title.set('touch end')
          },
          forcedown (data) {
            data.state.title.set('force down')
          },
          forceup (data) {
            console.log(data)
            data.state.title.set('force up')
          },
          // rightclick (data) {
          //   console.log(data)
          //   data.state.title.set('rightclick')
          // },
          // drag (data) {
          //   console.log(data)
          //   data.state.title.set('drag:' + (data.x - data.startX))
          // }
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
