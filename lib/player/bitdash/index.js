'use strict'
module.exports = {
  config: {
    id: 'bitdash-script',
    src: 'https://bitmovin-a.akamaihd.net/bitdash/beta/latest/bitdash.min.js'
  },
  init (src, done, ready) {
    this.postpone('bitdash-setup', () => {
      var instance = this.instance = global.bitdash(this.id)
      var settings = getSettings(this, src)
      instance.setup(settings)
      done(instance)
      // TODO contact bitdash that ready listener is not working
      this.postpone('isReady', function checkReady () {
        if (instance.isReady()) {
          ready()
        } else {
          this.postpone('isReady', checkReady, 100)
        }
      }, 100)
    })
  },
  dispose () {
    if (this.instance) {
      this.instance.unload()
      this.instance.destroy()
    }
  },
  getTime () {
    let instance = this.instance
    let current = instance.getCurrentTime()
    let duration = this.state.data.duration.val || instance.getDuration()
    return current / duration
  },
  getBuffer () {

  },
  time: {
    render (val) {
      var player = this.parent
      var duration = player.state.data.duration.val
      player.instance.seek(val * duration)
    }
  },
  volume: {
    render (val) {
      console.error('volume!', val)
      this.parent.instance.setVolume(val * 100)
    }
  },
  playing: {
    render (val) {
      var instance = this.parent.instance
      val ? instance.play() : instance.pause()
    }
  },
  src: {
    render (val) {
      val = parseSrc(val)
      if (val) {
        this.parent.instance
          .load(val)
          .catch((err) => {
            console.error(err)
          })
      }
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
    console.warn('src is not a string:', val)
  }
}

function getSettings (player, src) {
  var store = player.storeContext()
  var config = player.config
  var adconfig = config.advertising
  var settings = {
    advertising: adconfig && adconfig.plain(),
    source: parseSrc(src),
    key: config.key.val,
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
      onPlaybackFinished () {
        player.playing.origin.set(false)
        player.applyContext(store)
      },
      onError (err) {
        console.error(err)
      }
    }
  }

  return settings
}

function handleAds (player, settings) {
  if (settings.advertising) {
    let maxTries = 5
    let tryPlayAdVideo = () => {
      settings.postpone('builtinAds', function () {
        let id = `bitdash-ad-video-${id}`
        let adPlayer = document.getElementById(id)
        if (adPlayer) {
          adPlayer.setAttribute('webkit-playsinline', true)
          adPlayer.setAttribute('autoplay', true)
        } else if (maxTries--) {
          tryPlayAdVideo()
        }
      }, 50)
    }
    tryPlayAdVideo()
  }
}