'use strict'
var Observable = require('vigour-js/lib/observable')

var b = new Observable()
var c = new Observable()

var Conn = new Observable({
  upstream: {
    on: {
      data () {
        console.log('Conn', this.origin._path)
      }
    }
  }
}).Constructor

// so its in the reference.... the act of creating a new instance
var Protocol = new Observable({
  useVal: true,
  on: {
    value () {
      if (!this.hasOwnProperty('conn')) {
        this.conn = new Conn({ upstream: this })
      }
      // var conn = new Conn({ upstream: this })
    }
  }
}).Constructor

console.log('------------------')

var h = new Observable({
  key: 'h',
  b: new Protocol({})
})
var b = new Conn({ upstream: h.b })

console.log('------------------')
var h2 = new h.Constructor({
  key: 'h2',
  b: 'gurkens'
})
console.log('---------------------')

// var c = new a.Constructor({})
// var d = new Conn({ ups tream: h2.b })

/*
var Hub = new Observable({
  properties: {
    prtcl: Protocol
  }
}).Constructor

var h1 = new Hub({
  key: 'h1',
  prtcl: 'haha' // new instance of protocl fires the original conn.. should be easy to recreate
})

console.log('------------------')

var h2 = new h1.Constructor({
  key: 'h2',
  prtcl: 'hihi'
})
*/
