'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

var a = global.a = new Observable({
  val: 'a val',
  flups: 'a flup',
  gurkens: 'a gurkens',
  shows: {
    1: { textx: '?' },
    2: { textx: 'x' }
  }
})

var thing = new Element({
  $: true,
  text: { $: true },
  xxx: {
    text: { $: 'flups' }
  },
  css: {
    $: 'gurkens'
  },
  holder: {
    $collection: 'shows',
    properties: new Element({
      text: { $: 'textx' }
    })
  }
})

app.set({
  bla: new thing.Constructor(a)
})

console.log(a)
