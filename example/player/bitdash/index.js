'use strict'

var Observable = require('vigour-js/lib/observable')
Observable.prototype.inject(require('vigour-js/lib/operator/subscribe'))
Observable.prototype.inject(require('vigour-js/lib/operator/transform'))
Observable.prototype.inject(require('vigour-track'))

var PimpedElement = require('../utils/pimped-element')

var App = require('../../../lib/app')
var app = window.app = new App({
  node: document.body,
  ChildConstructor: PimpedElement
})

var Player = require('../../../lib/player/')

var thePlayer = new Player({
  inject: require('../../../lib/property/attributes'),
  options: {
    bitdashScriptUrl: '//bitdash-a.akamaihd.net/bitmovin-portal/564da69672496/043ac8aa88/latest/bitdash.min.js',
    key: 'ebacd4297ba9f6466fbd3164fbc42b4e',
    width: '1024px'
    // bitdashScriptUrl: 'http://blog.vigour.io/assets/scripts/bitdash.min.js',
    // key: 'd2aee4705ead414b60760cf0bbabe905'
  }
})


var Hub = require('vigour-hub')
var hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: 'ws://jim.local:3031'
  },
  play: true,
  time: 0
})

thePlayer.set({
  attributes: {
    id: 'mexirica'
  },
  inject: require('../../../lib/player/bitdash/'),
  src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4',
  source: {
    dash: '//eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/44855_41fa53de02cf600d6f56ac459dd5f015/44855.mpd',
    hls: '//eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/44855_41fa53de02cf600d6f56ac459dd5f015/44855.m3u8',
    poster: '//bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg'
  },
  volume: 0.1,
  play: hub.play,
  time: hub.time
})

// setTimeout(function () {
//   thePlayer.set({
//     // source: {
//     //   poster: 'http://vignette1.wikia.nocookie.net/unitedchans/images/9/97/Doge.jpg'
//     // }
//     // volume: 0.9
//     time: 0.99
//   })
// }, 8000)

// thePlayer.ad.set({
//   // src: 'http://html5videoformatconverter.com/data/images/happyfit2.mp4',
//   src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4',
//   play: true,
//   canSkip: true
// })

// myEl.set(thePlayer)

var customWidth = 1024
app.set({
  thePlayer: thePlayer,

  progressContainer: {
    node: 'div',
    width: customWidth,
    height: 30,

    progress: {
      width: '100%',
      style: {
        border: '1px solid red',
        boxSizing: 'border-box'
      },
      inject: require('../../../lib/events/drag'),
      on: {
        drag (e, event) {
          this.emit('click', e, event)
        },
        click (e) {
          var pos = e.x / customWidth
          thePlayer.time.origin.val = pos
        }
      },

      progressBar: {
        width: {
          $: '../../thePlayer.time',
          $transform (val) {
            return (val * 100) + '%'
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
          return (val * 100) + '%'
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
        hub.play.val = !hub.play.val
      }
    }
  },

  theProgress: {
    node: 'h4',
    text: {
      $: '../../thePlayer.time'
    }
  },

  theBuffer: {
    node: 'h4',
    text: {
      $: '../../thePlayer.buffer'
    }
  }
})
