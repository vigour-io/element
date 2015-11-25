'use strict'
var Observable = require('vigour-js/lib/observable')
Observable.prototype.inject(require('vigour-js/lib/operator/subscribe'))
Observable.prototype.inject(require('vigour-js/lib/operator/transform'))
var App = require('../../../lib/app')
var app = window.app = new App({
  node: document.body
})

var Player = require('../../../lib/player/')

var thePlayer = new Player({
  inject: require('../../../lib/player/html5'),
  // src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4',
  volume: 0.1,
  play: true
})

thePlayer.ad.set({
  // src: 'http://html5videoformatconverter.com/data/images/happyfit2.mp4',
  src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4',
  play: true
})

app.set({
  thePlayer: thePlayer,

  progressContainer: {
    node: 'div',
    inject: [
      require('../../../lib/property/attributes'),
      require('../../../lib/property/size')
    ],
    width: thePlayer.videoWidth,
    height: 30,

    progress: {
      inject: [
        require('../../../lib/property/attributes'),
        require('../../../lib/property/style'),
        require('../../../lib/property/size')
      ],
      width: {
        $: '../../thePlayer.time',
        $transform (val) {
          return ~~(val * 100) + '%'
        }
      },
      height: 8,
      style: {
        backgroundColor: 'red'
      }
    },

    bufferProgress: {
      inject: [
        require('../../../lib/property/attributes'),
        require('../../../lib/property/style'),
        require('../../../lib/property/size')
      ],
      width: {
        $: '../../thePlayer.buffer',
        $transform (val) {
          return ~~(val * 100) + '%'
        }
      },
      height: 8,
      style: {
        backgroundColor: '#03A9F4'
      }
    }
  },

  play: {
    node: 'button',
    inject: [
      require('../../../lib/property/text'),
      require('../../../lib/events/click')
    ],
    text: 'play/pause',
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
