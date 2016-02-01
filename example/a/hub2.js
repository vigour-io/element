'use strict'
var Hub = require('vigour-hub/')

var bla = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    id: 'normal-hub',
    websocket: {
      server: {
        http: {
          // val: //require('vigour-hub/lib/debug').serverLogger,
          field: require('vigour-hub/lib/debug').serverDebug
        }
      },
      val: 'ws://localhost:3033'
    }
  },
  shows: {},
  scope (scope, event, getScope) {
    var init
    if (!this._scopes || !this._scopes[scope]) {
      init = true
    }
    var ret = getScope.apply(this, arguments)
    if (init && scope[0] !== '#') {
      // how can this fuck it it up so much?
      // needs double later for scraper
      ret.set({
        // clients: {},
        adapter: {
          // id: scope + '-hubs',
          websocket: 'ws://localhost:3032',
          scope: scope
        }
      }, event)
    }
    return ret
  }
})

// bla.codes.set({
//   tempcode: true
// }, false)

bla.adapter.websocket.set({
  server: 3031
})

console.log('start normal hub')

// setTimeout(function () {
//   console.log('\n\n\nnow connect that fucker')
//   bla.adapter.websocket.val = 'ws://localhost:3033'
// }, 4000)

// hub is going to be insane when done -- adition of streams and sane chunking -- addiiton of nanomsg and you have an insane system


// so jsut add new property