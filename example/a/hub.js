'use strict'
var Hub = require('vigour-hub/')

var bla = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: {
      server: {
        http: {
          // val: //require('vigour-hub/lib/debug').serverLogger,
          field: require('vigour-hub/lib/debug').serverDebug
        },
        val: 3031
      },
      val: 'ws://localhost:3032'
    }
  },
  shows: {
    1: {
      title: 'from hub - 1'
    }
  }
})

// bla.$({
//   shows: {
//     '*': {
//       title: {
//         val: true
//       }
//     }
//   }
// })
