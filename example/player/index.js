'use strict'
require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Player = require('../../lib/player')
var Element = require('../../lib')

var app = global.app = new Element({
  DOM: document.body
})

Observable.prototype.inject(require('vigour-element/lib/subscription/stamp'))

var data1 = new Observable({
  img: {
    val: 'http://www.vier.be/sites/default/files/programma/erik-dsmtw.png'
  },
  number: {
    val: 1
  },
  title: {
    val: 'Aflevering van 12 oktober: Kevin Janssens, Kim Clijsters en Sam Louwyck'
  },
  time: {
    val: 0
  },
  duration: {
    val: 4020
  },
  video: {
    val: 'https://s3-eu-west-1.amazonaws.com/sbsvigour/output/111700_794541d68c8c4fbe47407aaaaa70ceef/{type}s/111700.{type}'
  },
  description: {
    val: 'In de allereerste aflevering van een nieuw seizoen nemen Kim Clijsters, Kevin Janssens en Sam Louwyck het tegen elkaar op.'
  }
})

// var data2 = new Observable()

// sbs integration
Player.prototype.set({
  inject: require('vigour-element/lib/player/bitdash'),
  config: {
    key: '225bef4e-5b4d-4444-94b1-4f2fd499fd3b'
  }
})

// example
global.app = app.set({
  val: data1,
  player: new Player(),
  button: {
    h: 40,
    w: '50%',
    type: 'button',
    html: 'remove',
    on: {
      down (e, event) {
        if (this.parent.player) {
          this.html.set('new player')
          this.parent.player.remove()
        } else {
          this.html.set('remove')
          this.parent.set({
            player: new Player()
          })
        }
      }
    }
  }
})
