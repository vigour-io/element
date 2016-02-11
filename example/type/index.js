'use strict'
var e = require('../../e')
var data  = require('./data')

// now nested components and proepries
var Observable = require('vigour-js/lib/observable')
var Data = new Observable({
  inject: require('../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor
// lets gogog go properties

// then add all this type stuff to base its super nice!

// so addng an element and attacihing the parent will mere types etc

// var Element()

// case 1 test setip fix it
// can be one of 2 things
// -- 1 components is not yet filled since doing for loop (most likeley)
// -- 2 type is straight ignored on a component

// console.clear()

// make retrieve work with normal objects

var x = new Data(global.starts)

var app = e({
  components: {
    a: {
      type: 'b'
      // something: {
      //   type: 'b'
      // }
    },
    b: {
      text: 'b'
    },
    input: {
      type: 'input',
      value: 'yo'
    }
  },
  bla: {
    $collection: true,
    // text () {
    //   return this.parent.key
    // },
    Child: 'Constructor' // this breaks! fix it in vjs! ITS WEIRD
  },
  // val: x,
  itsA: { type: 'a' },
  itsB: { type: 'b' }
  // xxx: { type: 'input' }
})

app.set({ DOM: document.body })



global.app = app
// app.set(data)
// use globals/document or something for document.body more portable
console.log(app)

// overwrite and properties fix it! (overwrite / merge thing and type differentiator)
// so if type is different it does not care
