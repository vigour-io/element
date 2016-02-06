'use strict'
module.exports = {
  config: {
    id: 'bitdash-script',
    src: 'https://bitmovin-a.akamaihd.net/bitdash/beta/latest/bitdash.min.js'
  },
  init (src, done, ready) {
    this.postpone('bitdash-setup', () => {
      var settings = getSettings(this, src)
      var bitplayer = global.bitdash(this.id)
      ready()
      bitplayer.setup(settings).then((instance) => {
        instance.addEventHandler('onReady', ready)
        handleAds(this, settings)
        done(instance)
      }, function (err) {
        console.error(err)
          // player.play.origin.val = false
          // handleError(err)
      })
    })
  },
  dispose () {
    if (this.instance) {
      this.instance.unload()
      this.instance.destroy()
    }
  },
  getTime () {
    console.log('getTime:')
  },
  getBuffer () {

  },
  time: {
    render (val) {
      this.instance.seek(val)
    }
  },
  volume: {
    render (val) {
      this.instance.setVolume(val * 100)
    }
  },
  src: {
    render (val) {
      val = parseSrc(val)
      if (val) {
        console.info('src:', val)
          // this.video
          //   .load(val)
          //   .catch((err) => {
          //     console.error(err)
          //   })
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
        player.applyContext(store)
        player.play.origin.set(false)
      },
      onError (err) {
        console.error(err)
      },
      onTimeChanged () {

      }
    }
  }

  return settings
}

function handleAds (player, settings) {
  // is this really nessecary?
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