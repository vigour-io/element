'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

var a = global.a = new Observable({
  val: '!!!!!!'
})

var thing = new Element({
  text: a
})

var thing2 = new Element({
  flups: new thing.Constructor()
})

app.set({
  txxxxx: new thing2.Constructor()
})
