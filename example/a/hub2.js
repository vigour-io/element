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
      },
      // val: 'ws://37.48.93.68:9000'
    }
  },
  shows: {
    1: {
      title: 'from hub - 1'
    }
  }
})

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
  })

  bla.shows[n].set({
    currentEpisode: bla.shows[n].seasons[1].episodes[1],
    currentSeason: bla.shows[n].seasons[2]
  })
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

setTimeout(() => {
  console.log('DO IT LULZ it out!')
  bla.set({
    lulz: 'hello my name is lulz!'
  })
}, 2000)

// bla.smurt.smarts.gurkens

// bla.adapter.websocket.set({
//   server: 3031
// })

console.log('start hub')
