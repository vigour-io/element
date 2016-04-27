'use strict'
const State = require('vigour-state')
const Element = require('../lib/element')
const render = require('../lib/render')

var app = new Element({
  text: 'hello'
})

document.body.appendChild(render(app))
