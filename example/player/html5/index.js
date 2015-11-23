'use strict'

var App = require('../../../lib/app')
var Element = require('../../../lib/element')
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

var secondPlayer = new Player({
  inject: require('../../../lib/player/players/html5')
})
secondPlayer.set({
  src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  volume: 0,
  time: {
    on: {
      data (data) {
        console.log('RAHH', this.val);
      }
    }
  }
})

app.set({
  // player: myPlayer,
  secondPlayer: secondPlayer,
  label: new Element({
    node: 'h1',
    inject: require('../../../lib/property/text'),
    text: secondPlayer.time
  })
})

// setTimeout(function () {
//   myPlayer.play.val = true
// }, 2000)

// setTimeout(function () {
//   // myPlayer.play.val = true
//   myPlayer.time.val = 0.9
//   myPlayer.volume.val = 0.3
// }, 3000)
