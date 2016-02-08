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
  key: '111',
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

var dataz = new Observable({
  key: '222',
  Child: Observable,
  img: {
    val: 'http://www.vier.be/sites/default/files/episode/1164364-7847b0d18de0c8e9b63da6208c71e079.jpg'
  },
  number: {
    val: 1
  },
  title: {
    val: 'Aflevering van 31 augustus: Harry & Olga'
  },
  time: {
    val: 0.02896701388888889
  },
  duration: {
    val: 2880
  },
  video: {
    val: 'https://s3-eu-west-1.amazonaws.com/sbsvigour/output/123540_79e55a610e2f7868140e5c7d4ecd740a/{type}s/123540.{type}'
  }
})

var cnt = 0
var dataarr = [datax, dataz]
  // var data2 = new Observable()

// sbs integration
Player.prototype.set({
  inject: require('vigour-element/lib/player/bitdash'),
  config: { key: '225bef4e-5b4d-4444-94b1-4f2fd499fd3b' }
})

var Balen = new Element({
  shit: new Player()
}).Constructor

var Genieten = new Element({
  balen: new Balen()
}).Constructor

function seek (e) {
  var rect = e.currentTarget.getBoundingClientRect()
  var x = rect.left
  var nr = (e.pageX - x) / (rect.right - x)
  var val = nr > 1 ? 1 : nr < 0 ? 0 : nr
  this.seek.bar.state.data.time.origin.val = val
}

// example
global.app = app.set({
  player: new Genieten(),
  progress: {
    inject: require('vigour-element/lib/event/drag'),
    on: {
      down (e) { seek.call(this, e) },
      drag (e) { seek.call(this, e) }
    },
    seek: {
      bar: {
        h: 20,
        w: {
          $: 'time',
          $transform (val) {
            return val * 100 + '%'
          }
        }
      }
    }
  },
  button: {
    h: 40,
    w: 100,
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
            player: new Genieten()
          })
          // needs to reapply data on set key else wrong state
        }
      }
    }
  },
  button2: {
    h: 40,
    w: 100,
    type: 'button',
    html: 'toggle',
    on: {
      down (e, event) {
        this.parent.player.balen.shit.toggle()
      }
    }
  },
  button3: {
    h: 40,
    w: 100,
    type: 'button',
    html: 'switch',
    on: {
      down (e, event) {
        let data = dataarr[++cnt] || dataarr[cnt = 0]
        this.parent._input.val = data
      }
    }
  },
  button4: {
    h: 40,
    w: 100,
    type: 'button',
    html: 'set random time',
    on: {
      down (e, event) {
        this.parent.origin.time.val = Math.random()
      }
    }
  },
  button5: {
    h: 40,
    w: 100,
    type: 'button',
    html: 'move to end',
    on: {
      down (e, event) {
        this.parent.origin.time.val = 0.9999999999
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
  val: new Observable(datax)
})
