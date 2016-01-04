'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor
// Element.prototype.inject(
  // require()
// )
require('./style.less')

app.set({
  thing: {
    text: 'im a thing!',
    y: 100
  }
})

app.set({
  thing2: {
    text: 'im another thing, yay!',
    y: {
      val: app.thing.y,
      $transform (val) {
        return val + 100
      }
    }
  }
})

setTimeout(function () {
  console.log('change the y!')
  app.thing.y.val = 200
}, 1000)
