'use strict'
var Observable = require('vigour-js/lib/observable')
Observable.prototype.inject(require('vigour-js/lib/operator/subscribe'))
Observable.prototype.inject(require('vigour-js/lib/operator/transform'))
// Observable.prototype.inject(require('vigour-track'))

// var PimpedElement = require('../utils/pimped-element')

var app = require('../../../lib/app')

const CUSTOM_WIDTH = 300

var Player = require('../../../lib/player/')
var VastClient = require('vast-client')

var thePlayer = new Player({
  inject: require('../../../lib/property/attributes'),
  options: {
    width: `${CUSTOM_WIDTH}px`,
    bitdashScriptUrl: 'https://bitmovin-a.akamaihd.net/bitdash/beta/4.1.0-b4/bitdash.min.js',
    key: 'f9f96c01-610f-437d-9a72-43abe98755b2'
  }
})

var adUrl = new Observable({
  val: ''
})

thePlayer.set({
  attributes: {
    id: 'mexirica'
  },
  inject: require('../../../lib/player/bitdash/'),
  src: {
    dash: 'https://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2038_d06f9f4f032f9f599edbe38f1acd2900/5391_93fe74e97ef2a8ff3389d5a490d902c7/5391.mpd',
    hls: 'https://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2038_d06f9f4f032f9f599edbe38f1acd2900/5391_93fe74e97ef2a8ff3389d5a490d902c7/5391.m3u8'
    // hls: 'http://abudhabimedia-lh.akamaihd.net/i/ch_adaloulahd@325615/master.m3u8'
  },
  volume: 0,
  play: true,
  time: 0.5,
  on: {
    render: {
      example () {
        VastClient.client.get('http://ads.adhese.be/ad3/sl_pre_adhese_-postroll/', function (res) {
          console.log('Vast Response', res)

          var ads = res.ads
          if (ads && ads.length) {
            var ad = ads[ads.length - 1]
            var creatives = ad.creatives
            if (creatives && creatives.length) {
              var creative = creatives[creatives.length - 1]
              var mediaFiles = creative.mediaFiles
              if (mediaFiles && mediaFiles.length) {
                // throw new Error('RAHH!')
                var mediaFile = mediaFiles[mediaFiles.length - 1]
                adUrl.val = mediaFile.fileURL
                // adUrl.val = 'http://www.macacofritodeoculospreto.com'
              }
            }
          }
        })
      }
    }
  }
})

thePlayer.ad.set({
  src: {
    progressive: adUrl
  },
  play: true,
  canSkip: true
})

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
          $: 'thePlayer.time',
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
        $: '../../../thePlayer.buffer',
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
        console.log('haha', thePlayer.ad.src)
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
  },

  duration: {
    node: 'h1',
    text: {
      $: 'thePlayer.duration'
    }
  },

  rahh: {
    node: 'h3',
    text: {
      $: 'thePlayer.rahh'
    }
  }
})
