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
        val: 3032
      }
      // val: 'ws://37.48.93.68:9000'
    },
    user: {}
  },
  shows: {
    1: {
      title: 'tssss'
    }
  },
  // ok so now we need to pass scope as well
  autoRemoveScopes: false,
  scope (scope, event, getScope) {
    var init
    if (!this._scopes || !this._scopes[scope]) {
      init = true
    }
    var ret = getScope.apply(this, arguments)
    if (init && scope[0] !== '#') {
      console.log('create scope -- authenticate and write data', scope)
      setTimeout(function () {
        ret.set({
          user: {
            yo: 'yo!'
          }
        })
      }, 3000)
      // normally it gets the new sopce here and has to do async loading
      // handler.call(ret, scope)
    }
    return ret
  },
})

console.log('start user hub')