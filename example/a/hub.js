'use strict'
var Hub = require('vigour-hub/')

var bla = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: {
      server: {
        http: require('vigour-hub/lib/debug').serverLogger
      }
    }
  },
  val: 'a val',
  flups: 'a flup',
  gurkens: 'a gurkens',
  a: {
    b: {
      c: 'hahaha'
    }
  },
  smurt: {
    smarts: {
      gurkens: [ '$', 'a', 'b', 'c' ], // can also support '~/a/b/c' //shorter also nice for normal obs!
      shows: [ '$', 'shows' ]
    }
  },
  shows: {
    1: {
      title: 'from hub - 1'
    }
  }
})

var n = 1
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
    currentEpisode: bla.shows[n].seasons[1].episodes[1]
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

bla.adapter.websocket.set({
  server: 3031
})

console.log('start hub')
