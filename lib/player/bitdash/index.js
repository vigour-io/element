'use strict'
var Player = require('../')
var cases = require('../../cases/')
var playExec = Player.prototype.play.exec
const SCRIPT_ID = 'bitdash-script'
var instance
var setTime
var hasBuiltinAd

module.exports = {
  define: {
    getTime () {
      if (this.ready.val) {
        let player = instance
        let current = setTime || player.getCurrentTime()
        let duration = this.duration.val || (this.duration.origin.val = player.getDuration())
        return current / duration
      } else {
        return this.time.val
      }
    },
    getBuffer () {
      if (!this.ready.val) {
        return 0
      }
      var player = instance
      var current = setTime || player.getCurrentTime()
      var duration = player.getDuration()
      var bufferLength = player.getVideoBufferLength()
      if (current === duration) {
        return 1
      }
      return (current + bufferLength) / duration
    },
    dispose () {
      var scriptEl = document.getElementById(SCRIPT_ID)
      if (scriptEl) {
        scriptEl.remove()
      }
      initialized = false
      setTime = null
      hasBuiltinAd = false
      if (instance) {
        instance.unload()
        instance.destroy()
        instance = null
        // if (ad) {
        //   if (adPlayer) {
        //     adPlayer.remove()
        //     adPlayer = null
        //   }
        // }
      }
    }
  },
  properties: {
    bitdashInstance: true
  },
  src: {
    define: {
      plain () {
        var val = this.val
        if (val) {
          var obj = {}
          if (typeof val === 'string') {
            obj.hls = val.replace(/{type}/g, 'm3u8')
            obj.mpd = val.replace(/{type}/g, 'mpd')
          } else {
            this.each(function (prop, key) {
              obj[key] = prop.val
            })
          }
          for (var i in obj) {
            return obj
          }
        }
      }
    },
    render (node, event, player) {
      var src = this.plain()
      if (src) {
        if (!instance) {
          init(player, node)
        } else {
          player.ready.origin.val = false
          instance
            .load(this.plain())
            .catch((err) => {
              player.play.origin.val = false
              handleError.call(this, err)
            })
        }
      } else {
        player.play.origin.val = false
        player.ready.origin.val = false
        if (instance) {
          instance.unload()
        }
      }
    }
  },
  play: {
    exec (node, event, player) {
      playExec.apply(this, arguments)
      if (this.val) {
        instance.play()
      } else {
        instance.pause()
      }
    }
  },
  volume: {
    exec (node, event, player) {
      instance.setVolume && instance.setVolume(this.val * 100)
    }
  },
  time: {
    exec (node, event, player) {
      if (player.isProgress(event)) {
        return
      }
      // // let isPaused = !player.play.val
      // // if (isPaused) {
      // //   player.play.origin.val = true
      // // }
      setTime = (player.duration.val || instance.getDuration()) * this.val
      // var seekAmount = (player.duration.val || instance.getDuration()) * this.val
      // setTimeout(() => {
      //   instance.seek(seekAmount)
      // })

      // if (isPaused) {
      //   player.timeout('time', function (player) {
      //     player.play.origin.val = false
      //   }, 10)
      // }
    }
  }
  // mute: {
  //   on: {
  //     data: {
  //       handle () {
  //         var parent = this.parent
  //         var player = parent.bitdashInstance
  //         if (!player || !parent.rendered || !hasSource.call(this)) {
  //           return
  //         }
  //         if (this.val) {
  //           player.mute()
  //         } else {
  //           player.unmute()
  //         }
  //       }
  //     }
  //   }
  // },
  // fullscreen: {
  //   exec (node, event, player) {

  //   }
  //   on: {
  //     data: {
  //       handle () {
  //         var parent = this.parent
  //         var player = parent.bitdashInstance
  //         if (!player || !parent.rendered || !hasSource.call(this)) {
  //           return
  //         }
  //         if (this.val) {
  //           player.enterFullscreen()
  //         } else {
  //           player.exitFullscreen()
  //         }
  //       }
  //     }
  //   }
  // }
}

var initialized = false
function init (player, node) {
  if (initialized) {
    return
  }
  initialized = true
  var opts = player.options
  var bitdashScript = document.createElement('script')
  var store = player.storeContext()
  bitdashScript.type = 'text/javascript'
  bitdashScript.src = opts && opts.bitdashScriptUrl
  bitdashScript.id = SCRIPT_ID
  bitdashScript.onload = () => {
    player.applyContext(store)
    config(player, node)
  }
  document.getElementsByTagName('head')[0].appendChild(bitdashScript)
}

function config (player, node) {
  if (!node.id) {
    node.setAttribute('id', 'dash-player')
  }

  let store = player.storeContext()
  let opts = player.options
  /* global bitdash */
  let config = {
    key: opts.key,
    playback: {
      autoplay: false
    },
    tweaks: {
      file_protocol: true,
      app_id: 'io.vigour.app'
    },
    skin: {},
    style: {
      ux: false,
      width: opts.width || '100%'
    },
    events: {
      onPlaybackFinished () {
        player.applyContext(store)
        player.play.origin.val = false
      },
      onFullscreenEnter () {
        player.applyContext(store)
        player.fullscreen.origin.val = true
      },
      onFullscreenExit () {
        player.applyContext(store)
        player.fullscreen.origin.val = false
      },
      onMute () {
        player.applyContext(store)
        player.mute.origin.val = true
      },
      onUnmute () {
        player.applyContext(store)
        player.mute.origin.val = false
      },
      onError (reason) {
        player.applyContext(store)
        handleError.call(player, reason)
      },
      onTimeChanged () {
        if (setTime) {
          player.timeout('seeking', function () {
            instance.seek(setTime)
            setTime = null
          }, 1)
        }
      }
    }
  }
  if (opts.advertising) {
    config.advertising = opts.advertising
    hasBuiltinAd = true
  }

  config.source = player.src.plain()
  var id = node.id
  var bitplayer = bitdash(id)

  player.applyContext(store)

  bitplayer.setup(config).then(function (value) {
    if (value && value.addEventHandler) {
      instance = global.bitdashInstance = value
      var videos = document.getElementsByTagName('video')
      for (let i = 0; i < videos.length; i++) {
        let video = videos[i]
        if (video.id.indexOf(node.id) === -1) {
          continue
        }
        video.setAttribute('webkit-playsinline', true)
        if (cases.$android.val) {
          video.setAttribute('autoplay', true)
        }
      }

      player.applyContext(store)

      player.ready.origin.val = true
      player.play.origin.val = true
      player.volume.origin.val = 1

      instance.addEventHandler('onReady', () => {
        player.applyContext(store)
        // player.ready.origin.val = true
        // player.play.origin.val = true
        // player.volume.origin.val = 1

        var videos = document.getElementsByTagName('video')
        for (let i = 0; i < videos.length; i++) {
          let video = videos[i]
          if (video.id.indexOf(node.id) === -1) {
            continue
          }
          video.setAttribute('webkit-playsinline', true)
        }
      })

      if (hasBuiltinAd) {
        let maxTries = 5
        let tryPlayAdVideo = function () {
          maxTries--
          player.timeout('builtinAds', function () {
            let id = `bitdash-ad-video-${node.id}`
            let adPlayer = document.getElementById(id)
            if (adPlayer) {
              adPlayer.setAttribute('webkit-playsinline', true)
              adPlayer.setAttribute('autoplay', true)
            } else {
              if (maxTries > 0) {
                tryPlayAdVideo()
              }
            }
          }, 50)
        }
        tryPlayAdVideo()
      }
    }
  }, function (err) {
    // player.play.origin.val = false
    handleError(err)
  })
}

function handleError () {
  console.error('Something went wrong with the player', arguments[0])
  // var reason = arguments.length === 1 && typeof arguments[0] === 'object' && arguments[0]
  // var obs = this
  // var playerConfig = instance && instance.getConfig()

  // if (reason) {
  //   //console.error('Error on instance', reason)
  // }
  // if (instance && instance.isSetup()) {
  //   if (obs.play.val === true && !instance.isPlaying()) {
  //     // play is true but it's not player = player errored and stopped it
  //     // check if it's related to ad
  //     if (playerConfig.source && (playerConfig.source.hls || playerConfig.source.progressive || playerConfig.source.dash)) {
  //       if (obs.ad.play.val === true) {
  //         obs.ad.skip.origin.val = true
  //       }
  //     }
  //   }
  // }
}
