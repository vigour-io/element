'use strict'

// var Player = require('../../../lib/player/')
var app = require('../../../lib/app')

var Player = require('../../../lib/player/')
var myPlayer = new Player({
  inject: require('../../../lib/player/players/html5')
})

myPlayer.set({
  play: false,
  src: 'http://localhost:8000/rahh.mov'
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
  myPlayer.volume.val = 0
}, 3000)

setTimeout(function () {
  // myPlayer.volume.val = 0.1
  // myPlayer.time.val = 0.9
}, 4000)

// setTimeout(function () {
//   myPlayer.play.val = false
// }, 6000)
