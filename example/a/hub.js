'use strict'
var Observable = require('vigour-js/lib/observable')
var debug = require('../../lib/util/debug')

var Hub = require('vigour-hub/')

// wrong
var bla = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: {
      server: 3031
    }
  },
  val: 'a val',
  flups: 'a flup',
  gurkens: 'a gurkens',
  shows: {
    1: {
      title: 'from hub - 1'
    }
  }
})

console.log('start hub')