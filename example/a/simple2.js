'use strict'
var Observable = require('vigour-js/lib/observable')
var Conn = new Observable({
  upstream: {
    on: {
      data () {
        console.log('Conn', this.origin.path, this.path)
      }
    }
  }
}).Constructor

var C = new Observable({
  on: {
    value () {
      console.log('fire gun')
    }
  }
  // b:
}).Constructor

console.log('-------------------------')
var x = new C({
  b: new Observable({
    val: 'lul',
    useVal: true,
    on: {
      data () {}
    }
  })
})

var y = new Conn({ upstream: x.b })

console.log('-------------------------')
var d = new x.Constructor({
  key: 'd',
  b: 'smuts'
})
// var z = new Conn({ upstream: d.b })
