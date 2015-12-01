'use strict'
var Observable = require('vigour-js/lib/observable')
Observable.prototype.inject(require('vigour-js/lib/operator/subscribe'))
Observable.prototype.inject(require('vigour-js/lib/operator/transform'))

const VAST_EXAMPLE_URL = 'http://ad3.liverail.com/?LR_PUBLISHER_ID=1331&LR_CAMPAIGN_ID=229&LR_SCHEMA=vast2'

var Player = require('../../../lib/player/')
var thePlayer = new Player({
  inject: [
    require('../../../lib/player/html5/index'),
    require('../../../lib/player/html5/vast-ad.js')
  ]
})

thePlayer.set({
  src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4',
  volume: 0.1,
  play: false,
  ad: {
    vastOptions: {
      supportedMediaTypes: [ 'video/mp4' ],
      // supportedMediaTypes: [ 'video/x-flv' ],
      mediaBitrateMim: 200,
      mediaBitrateMax: 1200
    },
    vastUrl: VAST_EXAMPLE_URL,
    play: true
  }
})

setTimeout(() => {
  // thePlayer.ad.play.val = true
}, 10000)

var PimpedElement = require('./utils/pimped-element')

var App = require('../../../lib/app')
var app = window.app = new App({
  node: document.body,
  ChildConstructor: PimpedElement
})

app.set({
  thePlayer: thePlayer,
  progressContainer: {
    node: 'div',
    width: thePlayer.videoWidth,
    height: 30,

    progress: {
      width: '100%',
      style: {
        border: '1px solid red',
        boxSizing: 'border-box'
      },
      on: {
        click (e) {
          var pos = e.x / thePlayer.videoWidth.val
          thePlayer.time.val = pos
        }
      },

      progressBar: {
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
      }
    },

    bufferProgress: {
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
  container: {
    play: {
      node: 'button',
      text: 'play/pause',
      on: {
        click () {
          thePlayer.toggle()
        }
      }
    }
  }
})
