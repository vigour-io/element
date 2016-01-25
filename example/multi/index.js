'use strict'
var debug = require('vigour-js/lib/util/debug')

var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

var Prop = require('../../lib/property')

var data = global.data = new Observable({
  title: 'bla'
})

require('./style.less')

var bla = new Element({
  $: true,
  one: {
    text: { $: 'title' }
  },
  two: {
    text: { $: 'title' }
  }
})

app.set({
  xxx: new bla.Constructor()
})

app.xxx.val = data
