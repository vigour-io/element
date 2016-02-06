'use strict'
module.exports = {
  config: {
    id: 'bitdash-script',
    src: 'https://bitmovin-a.akamaihd.net/bitdash/beta/latest/bitdash.min.js',
    key: '225bef4e-5b4d-4444-94b1-4f2fd499fd3b'
  },
  init (done, ready) {
    var bitplayer = global.bitdash(this.id)
    var settings = getSettings(this)
    console.info('bitdash init:')
    bitplayer.setup(settings).then((instance) => {
      instance.addEventHandler('onReady', ready)
      done(instance)

      // is this really nessecary?
      if (settings.advertising) {
        let maxTries = 5
        let tryPlayAdVideo = () => {
          this.postpone('builtinAds', function () {
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
    }, function (err) {
      console.error(err)
        // player.play.origin.val = false
        // handleError(err)
    })
  },
  dispose () {
    console.log('dispose!')
  },
  getTime () {

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

function parseSrc(val) {
  if (typeof val === 'string') {
    return {
      hls: val.replace(/{type}/g, 'm3u8'),
      mpd: val.replace(/{type}/g, 'mpd')
    }
  } else {
    console.warn('src is not a string:', val)
  }
}

function getSettings (player) {
  var store = player.storeContext()
  var config = player.config
  var settings = {
    source: parseSrc(player.src.val),
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

  if (config.advertising) {
    settings.advertising = config.advertising.plain()
  }

  return settings
}
