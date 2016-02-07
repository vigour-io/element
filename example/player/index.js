'use strict'
require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib')

var app = global.app = new Element({
  DOM: document.body
})

Observable = new Observable().Constructor
Observable.prototype.inject(require('vigour-element/lib/subscription/stamp'))

var Player = require('../../lib/player')

Player.prototype.volume.origin.val = 0
// app.volume

var datax = new Observable({
  Child: Observable,
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
    val: 0.5
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

var data1 = new Observable({
  Child: Observable,
  a: datax.serialize(),
  // b: { useVal: datax }
})
datax.time.val = 0.1

// var data2 = new Observable()

// sbs integration
Player.prototype.set({
  inject: require('vigour-element/lib/player/bitdash'),
  config: {
    key: '225bef4e-5b4d-4444-94b1-4f2fd499fd3b'
  }
})

var ref = global.ref = new Observable('flups')

var Plholder = new Element({
  $collection: true,
  Child: Player
}).Constructor

// remove is not called of course for things in context... thats only the remove emitter... so problem
// var Holder = new Element({
//   html: ref
// }).Constructor

// example
global.app = app.set({
  player: new Plholder(),
  button: {
    h: 40,
    w: 100,
    type: 'button',
    html: 'remove',
    on: {
      down (e, event) {
        if (this.parent.player) {
          this.html.set('new player')
          console.log('????')
          this.parent.player.remove()
        } else {
          this.html.set('remove')
          this.parent.set({
            player: new Player()
          })
        }
      }
    }
  },
  time: {
    html: {
      $: 'time',
      $prepend: 'time: '
    }
  },
  playing: {
    html: {
      val: 'not playing',
      $playerPlaying: 'playing!'
    }
  },
  ready: {
    html: {
      val: 'not ready',
      $playerReady: 'ready!'
    }
  },
  loading: {
    html: {
      val: 'done loading!',
      $playerLoading: 'loading...'
    }
  },
  muted: {
    html: {
      val: 'volume on!',
      $playerMuted: 'muted!'
    }
  },
  val: data1
})
