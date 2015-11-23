'use strict'

var App = require('../../../lib/app')
var Observable = require('vigour-js/lib/observable')
var Element = require('../../../lib/element')
var app = new App({
  node: document.body
})

var Player = require('../../../lib/player/')

var myPlayer = new Player({
  inject: require('../../../lib/player/players/html5'),
  play: false,
  src: 'http://localhost:8000/rahh.mov',
  volume: 1
})

var secondPlayer = new Player({
  inject: require('../../../lib/player/players/html5'),
  src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  volume: 0
})

app.set({
  // player: myPlayer,
  secondPlayer: secondPlayer,
  label: {
    node: 'h1',
    inject: require('../../../lib/property/text'),
    text: secondPlayer.time
  }
})

// secondPlayer.time.val = 1


// setTimeout(function () {
//   myPlayer.play.val = true
// }, 2000)

// setTimeout(function () {
//   // myPlayer.play.val = true
//   myPlayer.time.val = 0.9
//   myPlayer.volume.val = 0.3
// }, 3000)
