'use strict'
// thi sis the client
var Hub = require('vigour-hub')

var a = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: {
      val: 'ws://localhost:5051'
      // server: 5052
    }
  }
})

setInterval(() => {
  a.set({
    jobs: {
      [Math.random()*999]: { title: 'hello!' }
    }
  })
},500)