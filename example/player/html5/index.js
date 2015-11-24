'use strict'

var App = require('../../../lib/app')
var app = window.app = new App({
  node: document.body
})

var Player = require('../../../lib/player/')

var thePlayer = new Player({
  inject: require('../../../lib/player/html5'),
  src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  volume: 0.1,
  play: false
})

//
// theplay.ads.set({
//   src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
//   volume: 0.1,
//   play: true
// })

app.set({
  thePlayer: thePlayer,
  label: {
    node: 'h1',
    inject: require('../../../lib/property/text'),
    text: thePlayer.time
  },
  buffer: {
    inject: require('../../../lib/property/text'),
    text: thePlayer.buffer
  },
  play: {
    node: 'button',
    inject: [
      require('../../../lib/property/text'),
      require('../../../lib/events/click')
    ],
    text: 'play',
    on: {
      click () {
        thePlayer.toggle()
      }
    }
  }
})

// just testing removal
;(window.onunload = function () {
  app.remove()
})
