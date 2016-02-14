'use strict'
module.exports = {
  config: {
    id: 'bitdash-script',
    // src: 'https://bitmovin-a.akamaihd.net/bitdash/beta/latest/bitdash.min.js'
    src: 'http://bitmovin-a.akamaihd.net/bitdash/beta/4.2.0-b2/bitdash.min.js'
  },
  init (src, done, ready) {
    this.postpone('bitdash', () => {
      var instance = this.instance || window.bitdash(this.id)
      var settings = getSettings(this, src)
      var _this = this
      instance.setup(settings)
      var pollReady = function () {
        _this.instance.isReady && _this.instance.isReady()
        ? ready()
        : _this.postpone('ready', pollReady, 100)
      }
      done(instance)
      pollReady()
    })
  },
  dispose () {
    if (this.instance) {
      this.instance.unload()
      this.instance.destroy()
    }
  },
  getTime () {
    return this.instance.getCurrentTime()
  },
  getDuration () {
    return this.instance.getDuration()
  },
  getBuffer () {
    // TODO buffer info
  },
  seek (val) {
    this.instance.seek(val)
  },
  setVolume (val) {
    this.instance.setVolume(val * 100)
  },
  isStalled () {
    return this.instance.isStalled()
  },
  isPlaying (val) {
    return this.instance.isPlaying()
  },
  play () {
    this.instance.play()
  },
  pause () {
    this.instance.pause()
  },
  load (val, ready) {
    console.error('>>>>>>', val)
    val = parseSrc(val)
    if (val) {
      this.instance
      .load(val)
      .catch((err) => console.error(err))
    }
  }
}

function parseSrc (val) {
  if (typeof val === 'string') {
    return {
      hls: val.replace(/{type}/g, 'm3u8'),
      mpd: val.replace(/{type}/g, 'mpd')
    }
  } else {
    if (typeof val === 'object') {
      if (val.hls || val.dash) {
        return val
      } else {
        console.warn('src should at least have hls or|and dash property')
      }
    } else {
      console.warn('src is not a valid type (should be an object or a string):', val)
    }
  }
}

function getSettings (player, src) {
  var config = player.config
  var adconfig = config.advertising
  var settings = {
    advertising: adconfig && adconfig.plain(),
    source: typeof src === 'string' ? parseSrc(src) : src,
    key: config.apiKey.val,
    skin: {},
    playback: {
      autoplay: true
    },
    tweaks: {
      file_protocol: true,
      app_id: 'io.vigour.app'
    },
    style: {
      ux: false,
      width: '100%'
    },
    events: {
      onReady () {
        player.ready.origin.set(true)
      },
      onError (err) {
        console.error(err)
      }
    }
  }
  return settings
}

// function handleAds (player, settings) {
//   if (settings.advertising) {
//     let maxTries = 5
//     let tryPlayAdVideo = () => {
//       settings.postpone('builtinAds', function () {
//         let id = `bitdash-ad-video-${id}`
//         let adPlayer = document.getElementById(id)
//         if (adPlayer) {
//           adPlayer.setAttribute('webkit-playsinline', true)
//           adPlayer.setAttribute('autoplay', true)
//         } else if (maxTries--) {
//           tryPlayAdVideo()
//         }
//       }, 50)
//     }
//     tryPlayAdVideo()
//   }
// }
