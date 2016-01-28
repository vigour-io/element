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
      }
      // val: 'ws://37.48.93.68:9000'
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
      ret.set({
        // clients: {},
        adapter: {
          websocket: 'ws://localhost:3032',
          scope: scope
        }
      }, event)
    }
    return ret
  },
  // autoRemoveScopes: false,
  user: {},
  shows: {}
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

var n = 4
while (n) {
  var s = 10
  var seasons = {}
  while (s) {
    s--
    let episodes = {}
    let e = 20
    seasons[s] = {
      number: s + 1,
      episodes: episodes
    }
    while (e) {
      e--
      episodes[e] = {
        title: 'episode!' + s + '.' + e,
        number: e + 1,
        description: gentext(n),
        video: 'bla' + e,
        img: 'xxxxxx' + e,
        time: 0
      }
    }
  }
  bla.shows.setKey(n, {
    title: 'haha show!' + n,
    description: gentext(n),
    seasons: seasons
  }, false)

  bla.shows[n].set({
    currentEpisode: bla.shows[n].seasons[1].episodes[1],
    currentSeason: bla.shows[n].seasons[2]
  }, false)
  n--
}

function gentext () {
  var g = 100
  var str = ''
  while (g) {
    g--
    str += ' dcewew '
  }
  return str
}

bla.adapter.websocket.set({
  server: 3031
})

console.log('start hub')
