'use strict'

var Hub = require('vigour-hub')

var a = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    val: 'ws://localhost:5051'
  }
})
