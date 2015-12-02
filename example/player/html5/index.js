'use strict'
var Observable = require('vigour-js/lib/observable')
Observable.prototype.inject(require('vigour-js/lib/operator/subscribe'))
Observable.prototype.inject(require('vigour-js/lib/operator/transform'))
Observable.prototype.inject(require('vigour-track'))

var PimpedElement = require('./utils/pimped-element')

var App = require('../../../lib/app')
var app = window.app = new App({
  node: document.body,
  ChildConstructor: PimpedElement
})

var Player = require('../../../lib/player/')

var thePlayer = new Player({
  inject: require('../../../lib/player/html5'),
  // src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4',
  volume: {
    val: 0.1,
    track: true
  },
  play: {
    val: true,
    track: true
  }
})

var tracking = require('vigour-track')
var Observable = require('vigour-js/lib/observable')
var trackerEmitter = require('vigour-track/lib/emitter')

trackerEmitter.inject(require('vigour-track/lib/emitter/service'))

thePlayer.ad.set({
  // src: 'http://html5videoformatconverter.com/data/images/happyfit2.mp4',
  src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4',
  play: true,
  canSkip: true
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

  play: {
    node: 'button',
    text: 'play/pause',
    on: {
      click () {
        thePlayer.toggle()
      }
    }
  },

  skip: {
    node: 'button',
    text: 'skip',
    attributes: {
      disabled: {
        $: '../../thePlayer.ad.canSkip',
        $transform () {
          return !thePlayer.ad.canSkip.val
        }
      }
    },
    on: {
      click () {
        thePlayer.ad.skip.val = true
      }
    }
  }
})

// just testing removal
;(window.onunload = function () {
  app.remove()
})
