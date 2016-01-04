'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

var Thing = new Element({
  // text: 'look, im a thing!'
}).Constructor

var Modal = new Element({
  // text: 'xxxx'
  properties: {
    thing: Thing
  },
  thing: {
    text: 'funny thing'
  }
}).Constructor

app.set({
  modal: new Modal()
})

setTimeout(function () {
  app.modal.remove()
}, 500)

console.error('not removed...')
setTimeout(function () {
  app.set({
    modal: new Modal()
  })
}, 1000)
