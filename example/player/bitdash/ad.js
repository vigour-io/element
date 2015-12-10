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
var CUSTOM_WIDTH = 1024

var Player = require('../../../lib/player/')

var thePlayer = new Player({
  inject: require('../../../lib/property/attributes'),
  options: {
    bitdashScriptUrl: '//bitdash-a.akamaihd.net/bitmovin-portal/564da69672496/043ac8aa88/latest/bitdash.min.js',
    key: 'ebacd4297ba9f6466fbd3164fbc42b4e',
    width: `${CUSTOM_WIDTH}px`
    // bitdashScriptUrl: 'http://blog.vigour.io/assets/scripts/bitdash.min.js',
    // key: 'd2aee4705ead414b60760cf0bbabe905'
  }
})

thePlayer.set({
  attributes: {
    id: 'mexirica'
  },
  inject: require('../../../lib/player/bitdash/'),
  source: {
    dash: '//eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/44855_41fa53de02cf600d6f56ac459dd5f015/44855.mpd',
    hls: '//eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/44855_41fa53de02cf600d6f56ac459dd5f015/44855.m3u8'
  },
  volume: 0.9,
  play: true,
  fullscreen: {
    on: {
      data: {
        test () {
          console.log('FULLSCREEN HAS CHANGED to:', this.val)
        }
      }
    }
  }
})

// setTimeout(function () {
//   // thePlayer.set({
//   //   source: {
//   //     dash: '//eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/45138_0c23e1f0d512875c60c51db6e5ba9a39/45138.mpd',
//   //     hls: '//eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/45138_0c23e1f0d512875c60c51db6e5ba9a39/45138.m3u8'
//   //   }
//   // })
//   // app.remove()
//   thePlayer.remove()
// }, 7000)

thePlayer.ad.set({
  source: {
    dash: '//eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/45138_0c23e1f0d512875c60c51db6e5ba9a39/45138.mpd',
    hls: '//eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/45138_0c23e1f0d512875c60c51db6e5ba9a39/45138.m3u8'
  },
  play: true,
  canSkip: true
})

// myEl.set(thePlayer)

app.set({
  thePlayer: thePlayer,

  progressContainer: {
    node: 'div',
    width: CUSTOM_WIDTH,
    height: 30,

    progress: {
      width: '100%',
      style: {
        border: '1px solid red',
        boxSizing: 'border-box'
      },
      on: {
        click (e) {
          var pos = e.x / CUSTOM_WIDTH
          thePlayer.time.val = pos
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
        thePlayer.toggle()
      }
    }
  },

  mute: {
    node: 'button',
    text: {
      $: '../../thePlayer.mute',
      $transform (data) {
        return data ? 'unmute' : 'mute'
      }
    },
    on: {
      click () {
        thePlayer.mute.val = !thePlayer.mute.val
      }
    }
  },

  fullscreen: {
    node: 'button',
    text: {
      $: '../../thePlayer.fullscreen',
      $transform (data) {
        return data ? 'exit fullscreen' : 'fullscreen'
      }
    },
    on: {
      click () {
        thePlayer.fullscreen.val = !thePlayer.fullscreen.val
      }
    }
  },

  skip: {
    node: 'button',
    text: 'skip ad',
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
  },

  volumeContainer: {
    label: {
      node: 'label',
      text: 'volume:'
    },
    volume: {
      node: 'input',
      attributes: {
        type: 'range',
        min: 0,
        max: 100,
        value: {
          $: 'volume',
          $transform () {
            return thePlayer.volume.val * 100
          }
        }
      },
      on: {
        change () {
          thePlayer.volume.val = this.node.value / 100
        }
      },
      width: 100
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
