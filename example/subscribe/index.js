'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

Observable.prototype.inject(
  require('vigour-js/lib/observable/subscribe')
)
require('./style.less')

var a = new Observable({
  key:'a'
})

console.log('---- subscribe')

a.subscribe('b.c', 'data', function () {
  console.log('FIRES', this.val)
})

console.log('---- add the target REF')

var ref = new Observable({
  key: 'ref',
  c: 1
})

console.log('---- add the ref')

a.set({
  b: ref
})

console.log('---- change the ref')

// ref.c.val = 2

// console.log('getRef:', a.retrieve('b.c'))

console.log('---- add the target')

a.set({
  b: {
    c: 3
  }
})

console.log('---- change the value')

a.b.c.val = 4

console.log('---- remove c')

a.b.c.remove()

console.log('---- add')

a.b.set({
  c: true
})

// console.log('---- add more props!, should not fire')

// a.set({
//   d: true
// })

// console.log('---- unsubscribe')

// a.unsubscribe('b.c')

// console.log('---- change the value, should not fire')

// a.b.c.val = 5

// console.log('---- subscribe a.b.c to parent.parent')

// a.b.c.subscribe('parent.parent', 'data', function () {
//   console.log('FIRE OTHER', this.val)
// })

// console.log('---- change the value')

// a.val = 'drolly'

