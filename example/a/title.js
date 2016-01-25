'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')


var Title = new Element({
  node: 'h4',
  text: 'loser'
}).Constructor

var Blurf = new Element({
  aitle: new Title(),
  // blurf: {}
}).Constructor

var gurk = new Blurf({
  aitle: {
    text: 'yuzzzzzz'
  },
  blurf: {
    text: 'xx fddfsdf dsfdfsdsf dsfdsfxx'
  }
}).Constructor

app.set({
  gurk: new gurk()
})
