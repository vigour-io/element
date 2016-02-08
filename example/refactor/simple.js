var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
require('./todo.less')

var _set = Observable.prototype.set

var Cached = new Observable({
  inject: require('../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor

var bla = global.bla = new Cached(20)

var app = new Element({
  DOM: document.body,
  bla: {
    properties: {
      james: new Element({
        text: {
          $: 'lulz'
        }
      })
    },
    text: bla,
    'jurk:james': {
      text: bla
    }
  }
})
