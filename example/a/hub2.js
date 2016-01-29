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
  // codes: {
  //   noContext: true,
  //   noInstance: true,
  //   Child: {
  //     // on: {
  //     //   new (val, event) {
  //     //     console.log('haha new', event.stamp, event.client && event.client.val)
  //     //     // find the client -- what about attaching the client to the event super conveniet
  //     //   }
  //     // },
  //     noContext: true,
  //     noInstance: true
  //   }
  // }
})

// bla.codes.set({
//   tempcode: true
// }, false)

bla.adapter.websocket.set({
  server: 3031
})

console.log('start normal hub')
