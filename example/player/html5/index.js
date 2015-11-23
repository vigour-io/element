'use strict'

var App = require('../../../lib/app')
var app = new App({
  node: document.body
})

var Player = require('../../../lib/player/')
var myPlayer = new Player({
  inject: require('../../../lib/player/players/html5')
})

myPlayer.set({
  play: false,
  src: 'http://localhost:8000/rahh.mov',
  volume: 1
})

app.set({
  player: myPlayer
})

setTimeout(function () {
  myPlayer.play.val = true
}, 2000)

setTimeout(function () {
  // myPlayer.play.val = true
  myPlayer.time.val = 0.9
  myPlayer.volume.val = 0.3
}, 3000)
