'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

var a = global.a = new Observable({
  val: '!!!!!!'
})

var thing = new Element({
  text: a,
  css: {
    $: 'flups'
  }
})

var thing2 = new Element({
  flups: new thing.Constructor()
})

app.set({
  tx: new thing2.Constructor()
})

var m = {}
console.log(app.tx.$map(void 0, void 0, m), m)

// console.log(app.tx.storedmap)

app.tx.set({
  bla: {
    text: {
      $: 'gurkens'
    }
  }
})

var m = {}
console.log('?', app.tx.$map(void 0, void 0, m), m)