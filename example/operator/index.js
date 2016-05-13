'use strict'
require('../style.css')
const s = require('vigour-state/s')
const render = require('../../lib/render')

const elem = {
  key: 'app',
  holder: {
    text: {
      val: 'hello',
      $add: {
        $: 'planet'
      }
    }
  }
}

const state = s({
  planet: ' world'
})

document.body.appendChild(render(elem, state))