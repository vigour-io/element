'use strict'
var Observable = require('vigour-js/lib/observable')
var Data = new Observable({
  inject: require('../../../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor

var data = new Data({
  1: {
    title: 'hello'
  },
  2: {
    title: 'blurf'
  },
  3: {
    title: 'gurks'
  }
})
var e = require('../../../../e')

var app = e({
  holder: {
    $collection: true,
    Child: {
      text: { $: 'title' }
    }
  },
  DOM: document.body
})

// setting xx in one go is wrong since there is no event on e.. may need to do something about it
// make event on initial set it everywhere?

app.set({
  val: data
})
