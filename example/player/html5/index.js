'use strict'

var App = require('../../../lib/app')
var app = window.app = new App({
  node: document.body
})

var Player = require('../../../lib/player/')

var thePlayer = new Player({
  inject: require('../../../lib/player/players/html5'),
  src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  volume: 0.1
})

app.set({
  thePlayer: thePlayer,
  label: {
    node: 'h1',
    inject: require('../../../lib/property/text'),
    text: thePlayer.time
  }
})

// just testing removal
;(window.onunload = function () {
  app.remove()
})
