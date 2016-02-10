'use strict'
require('./style.less')

var Prop = require('../../lib/property')
var Observable = require('vigour-js/lib/observable')

Observable = new Observable().Constructor
Observable.prototype.inject(require('../../lib/subscription/stamp'))
Observable.prototype.set({
  Child: Observable
})

var Element = require('../../lib')

var app = global.app = new Element({
  DOM: document.body
})

var data = new Observable({
  current: new Observable({
    title: 'hahahaha'
  })
})


app.set({
  thing: {
    text: {
      $: 'title'
    },
    $: 'current'
  },
  val: data
})

setTimeout(function () {
  console.error('-----------', data.current._on)
  data.set({
    current: new Observable({
      title: Math.random()
    })
  })
  // data.current.set(new Observable({
  //   title: Math.random()
  // }))
}, 1000)