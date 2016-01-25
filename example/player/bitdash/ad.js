'use strict'
var Observable = require('vigour-js/lib/observable')
Observable.prototype.inject(require('vigour-js/lib/operator/subscribe'))
Observable.prototype.inject(require('vigour-js/lib/operator/transform'))
// Observable.prototype.inject(require('vigour-track'))

var App = require('../../../lib/app')
var app = window.app = new App({
  node: document.body,
  ChildConstructor: PimpedElement
})
const CUSTOM_WIDTH = 300

var Player = require('../../../lib/player/')

var thePlayer = new Player({
  inject: require('../../../lib/property/attributes'),
  options: {
    width: `${CUSTOM_WIDTH}px`,
    bitdashScriptUrl: 'https://bitmovin-a.akamaihd.net/bitdash/beta/4.1.0-b4/bitdash.min.js',
    key: 'f9f96c01-610f-437d-9a72-43abe98755b2',
    advertising: {
      client: 'vast',
      schedule: {
        'pre-roll-ad': {
          offset: 'pre',
          tag: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F32573358%2F2nd_test_ad_unit&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=http%3A%2F%2Freleasetest.dash-player.com%2Fads%2F&description_url=[description_url]&correlator=' + Math.floor(Date.now() + Math.random() * 10000)
        },
        'mid-roll-ad-01': {
          offset: '50%',
          tag: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F32573358%2F2nd_test_ad_unit&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=http%3A%2F%2Freleasetest.dash-player.com%2Fads%2F&description_url=[description_url]&correlator=' + Math.floor(Date.now() + Math.random() * 10000)
        },
        'post-roll-ad': {
          offset: 'post',
          tag: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F32573358%2F2nd_test_ad_unit&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=http%3A%2F%2Freleasetest.dash-player.com%2Fads%2F&description_url=[description_url]&correlator=' + Math.floor(Date.now() + Math.random() * 10000)
        }
      }
    }
  }
})

// thePlayer.set({
//   attributes: {
//     id: 'mexirica'
//   },
//   inject: require('../../../lib/player/bitdash/'),
//   source: {
//     dash: 'http://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/44855_41fa53de02cf600d6f56ac459dd5f015/44855.mpd',
//     hls: 'http://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/44855_41fa53de02cf600d6f56ac459dd5f015/44855.m3u8'
//   },
//   volume: 1,
//   play: true
// })

// thePlayer.ad.set({
//   source: {
//     dash: 'http://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/45138_0c23e1f0d512875c60c51db6e5ba9a39/45138.mpd',
//     hls: 'http://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/45138_0c23e1f0d512875c60c51db6e5ba9a39/45138.m3u8'
//   },
//   play: true,
//   canSkip: true
// })

thePlayer.set({
  attributes: {
    id: 'mexirica'
  },
  inject: require('vigour-element/lib/player/bitdash/'),
  source: {
    dash: 'http://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/44855_41fa53de02cf600d6f56ac459dd5f015/44855.mpd',
    hls: 'http://eu-storage-bitcodin.storage.googleapis.com/bitStorage/2686_1acb6ae99aa947d716463ce5bf3947ce/44855_41fa53de02cf600d6f56ac459dd5f015/44855.m3u8'
  },
  volume: 1,
  play: true
})

thePlayer.ad.set({
  source: {
    progressive: 'http://techslides.com/demos/sample-videos/small.mp4'
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
