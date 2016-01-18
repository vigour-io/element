'use strict'
var debug = require('vigour-js/lib/util/debug')

var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

app.set({
  bla: {
    xx: {
      text: 'xxx'
    }
  }
})

app.bla.set({
  xx: new Element({
    type:'li',
    text: 'yyy'
  })
})