'use strict'
require('./style.less')
var Element = require('../../lib')

var app = global.app = new Element({
  DOM: document.body
})

var count = 0

app.set({
  thing: {
    text () {
      return ++count
    }
  }
})

// frame = 1 ===> timeline === [[next1]]
// frame = 6 ===> timeline === [[next2], 4, [next1]]


setTimeout(function () {
  var Event = require('vigour-js/lib/event')
  app.thing.patch(new Event('data'), app.thing.state, 10)
}, 100)
