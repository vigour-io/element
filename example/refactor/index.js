'use strict'
var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')

var app = new Element({
  DOM: document.body
})

var list = new Observable({
  1: { title: 'xxx' },
  2: { title: 'yyy' }
})

var list2 = new Observable({
  1: { title: 'hhh' },
  2: { title: 'hihih' }
})
// update from 'sbscribeble or something give it a good name -- that can be used anywhere'
// this will make update buble up! amaze ballz!

app.set({
  key: 'app',
  bla: {
    text: 'lulz'
  },
  bla2: {
    Child: {
      text: { $: 'title' }
    },
    $collection: true,
    val: list
  }
})

setTimeout(function () {
  app.bla2.val = list2
}, 500)

// rename vjs to observable
