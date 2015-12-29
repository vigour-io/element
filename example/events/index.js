'use strict'
var Element = require('../../lib/element')
var Event = require('vigour-js/lib/event')
var Observable = require('vigour-js/lib/observable')
var App = require('../../lib/engine/dom')
require('./style.less')

Element.prototype.inject(
  require('../../lib/event/down'),
  require('../../lib/event/click'),
  require('../../lib/event/up')
)

var app = new App({
  downer: new Element({
    text: 'downer',
    on: {
      down () {
        console.log('down')
      }
    }
  }),
  upper: new Element({
    text: 'upper',
    on: {
      up () {
        console.log('up')
      }
    }
  }),
  clicker: new Element({
    text: 'clicker',
    on: {
      click () {
        console.log('click')
      }
    }
  })
})
