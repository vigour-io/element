'use strict'
var Hub = require('vigour-hub/')

var bla = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: {

    }
  },
  val: 'a val',
  flups: 'a flup',
  gurkens: 'a gurkens',
  a: {
    b: {
      c: 'hahaha'
    }
  },
  smurt: {
    smarts: {
      gurkens: [ '$', 'a', 'b', 'c' ] // can also support '~/a/b/c' //shorter also nice for normal obs!
    }
  },
  shows: {
    1: {
      title: 'from hub - 1'
    }
  }
})

// bla.smurt.smarts.gurkens

bla.adapter.websocket.set({
  server: 3031
})

console.log('start hub')
