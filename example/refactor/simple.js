var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
require('./todo.less')

var _set = Observable.prototype.set

var Cached = new Observable({
  inject: require('../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor

var bla = global.bla = new Cached({
  a: 10,
  b: 20,
  c: 30,
  james: 100,
  'a:james': 200
})

var collectionThing = new Element({
  $collection: true,
  properties: {
    james: new Element({
      gurk: {
        text: 'hello'
      },
      text: {
        $add: 'lulz'
      }
    })
  },
  Child: {
    text: { $: true }
  }
}).Constructor

// after that fix the child thing and context updates

var app = new Element({
  DOM: document.body,
  xxx: new collectionThing(bla)
})
