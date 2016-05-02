'use strict'
require('../style.css')

const render = require('../../lib/render')
const elem = {
  key: 'app',
  holder: {
    text: 'event test!',
    on: {
      mousedown (event) {
        console.error('mousedown!', event)
      }
    }
  }
}

console.log('----render----')
document.body.appendChild(render(elem))

