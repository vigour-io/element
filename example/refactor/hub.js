'use strict'
var Hub = require('vigour-hub/')
var hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: {
      server: {
        http: {
          // val: //require('vigour-hub/lib/debug').serverLogger,
          field: require('vigour-hub/lib/debug').serverDebug
        },
        val: 3033
      }
      // val: 'ws://37.48.93.68:9000'
    }
  },
  shows: {},
  // ok so now we need to pass scope as well
  autoRemoveScopes: false,
  scope (scope, event, getScope) {
    var init
    if (!this._scopes || !this._scopes[scope]) {
      init = true
    }
    var ret = getScope.apply(this, arguments)
    if (init) {
      console.log('ok language!', scope)
      // normally it gets the new sopce here and has to do async loading
      // handler.call(ret, scope)
    }
    return ret
  }
})

var n = 1e2
while (n) {
  var s = 2
  var seasons = {}
  while (s) {
    s--
    let episodes = {}
    let e = 2
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
  hub.shows.setKey(n, {
    title: 'haha show!' + n,
    description: gentext(n),
    seasons: seasons
  }, false)

  hub.shows[n].set({
    currentEpisode: hub.shows[n].seasons[1].episodes[1],
    currentSeason: hub.shows[n].seasons[2]
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

// so double instances..... this will become hard
console.log('start scraper hub')
