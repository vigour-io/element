'use strict'
var Element = require('../../lib/element')
var Event = require('vigour-js/lib/event')
var Observable = require('vigour-js/lib/observable')
var App = require('../../lib/engine/dom')
require('./style.less')

Observable.prototype.inject(
  require('vigour-js/lib/operator/add')
)

Element.prototype.inject(
  require('../../lib/event/down'),
  require('../../lib/event/click'),
  require('../../lib/event/up'),
  require('../../lib/event/drag'),
  require('../../lib/event/move'),
  require('../../lib/event/render')
)

var holder = new Element({
  downer: new Element({
    text: 'downer',
    // css: 'red',
    on: {
      mousedown () {
        this.text.val = Math.random()
        console.log('down', this.path, '->', this.text.path)
      }
    }
  }),
  upper: new Element({
    text: 'upper',
    on: {
      mouseup () {
        this.text.val = Math.random()
        console.log('up', this.path, '->', this.text.path)
      }
    }
  }),
  clicker: new Element({
    text: 'clicker',
    on: {
      click () {
        this.text.val = Math.random()
        console.log('click', this.path, '->',this.text.path)
      }
    }
  }),
  dragger: new Element({
    text: 'dragger',
    on: {
      drag () {
        console.log('drag')
      }
    }
  }),
  mover: new Element({
    text: 'mover',
    on: {
      move () {
        console.log('move')
      }
    }
  })
})

var app = new App({
  holder1: new holder.Constructor()//,
  // holder2: new holder.Constructor()
})
