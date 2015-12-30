'use strict'

const SCRIPT_ID = 'bitdash-script'

var BitdashPlayer = {
  define: {
    getTime () {
      if (this.ready.val) {
        let player = this.bitdashInstance
        let current = player.getCurrentTime()
        let duration = player.getDuration()
        return current / duration
      } else {
        return this.time.val
      }
    },
    getBuffer () {
      if (!this.ready.val) {
        return 0
      }
      var player = this.bitdashInstance
      var current = player.getCurrentTime()
      var duration = player.getDuration()
      var bufferLength = player.getVideoBufferLength()
      if (current === duration) {
        return 1
      }
      return (current + bufferLength) / duration
    },
    dispose () {
      var player = this.bitdashInstance
      player.unload()
      player.destroy()
      removeScript()
    }
  },
  inject: [
    require('../../../lib/events/render'),
    require('./ad')
  ],
  properties: {
    bitdashInstance: true
  },
  ready: {
    $type: 'boolean',
    inject: require('vigour-js/lib/observable/is')
  },
  on: {
    render: {
      bitdash (data) {
        window.addEventListener('error', () => { handleError.apply(this, arguments) })
        loadScript.call(this)
      }
    },
    videoReady: {
      bitdash (data, event) {
        if (!this.bitdashInstance) {
          return
        }
        this.duration.set(Math.floor(this.bitdashInstance.getDuration() + 1))
        this.volume.emit('data', null)
        this.ready.set(true)
        this.play.emit('data', null)
      }
    },
    videoReadyFirstTime: {
      bitdash (data, event) {
        this.time.emit('data', null)
      }
    },
    finished: {
      bitdash (data, event) {
        if (!this.ad.play.val) {
          this.play.val = false
        }
      }
    }
  },
  source: {
    inject: [
      require('vigour-js/lib/observable/is')
    ],
    dash: {
      $type: 'string',
      on: { data: { handle: handleSource } }
    },
    hls: {
      $type: 'string',
      on: { data: { handle: handleSource } }
    },
    progressive: {
      $type: 'string',
      on: { data: { handle: handleSource } }
    },
    poster: {
      $type: 'string',
      on: { data: { handle: handleSource } }
    },
    on: {
      data: {
        handle: handleSource
      }
    }
  },
  play: {
    inject: [
      require('vigour-js/lib/observable/is')
    ],
    on: {
      data: {
        handle (data, event) {
          var player = this.parent.bitdashInstance
          if (!player || !this.parent.rendered || !hasSource.call(this)) {
            return
          }
          this.parent.ready.is(true, () => {
            if (this.val) {
              player.play()
            } else {
              player.pause()
            }
          }, event)
        }
      }
    }
  },
  volume: {
    on: {
      data: {
        handle () {
          var parent = this.parent
          var player = parent.bitdashInstance
          if (!parent.rendered || !hasSource.call(this)) {
            return
          }
          player.setVolume && player.setVolume(this.val * 100)
        }
      }
    }
  },
  time: {
    on: {
      data: {
        handle (data, event) {
          var parent = this.parent
          var player = parent.bitdashInstance
          if (!parent.rendered || !hasSource.call(this) || this.parent.isProgress(event)) {
            return
          }
          parent.ready.is(true, () => {
            var isPaused = !parent.play.val
            if (isPaused) {
              parent.play.val = true
            }
            player.seek(parent.duration.val * this.val)
            if (isPaused) {
              setTimeout(() => {
                parent.play.val = false
              }, 10)
            }
          })
        }
      }
    }
  },
  mute: {
    on: {
      data: {
        handle () {
          var parent = this.parent
          var player = parent.bitdashInstance
          if (!player || !parent.rendered || !hasSource.call(this)) {
            return
          }
          if (this.val) {
            player.mute()
          } else {
            player.unmute()
          }
        }
      }
    }
  },
  fullscreen: {
    on: {
      data: {
        handle () {
          var parent = this.parent
          var player = parent.bitdashInstance
          if (!player || !parent.rendered || !hasSource.call(this)) {
            return
          }
          if (this.val) {
            player.enterFullscreen()
          } else {
            player.exitFullscreen()
          }
        }
      }
    }
  }
}

module.exports = function (element) {
  element.set(BitdashPlayer)
}

function hasSource () {
  var parent = this.parent
  return parent.source && (
    parent.source.dash ||
    parent.source.progressive ||
    parent.source.hls
  )
}

function getVal () {
  if (typeof this.val === 'string') {
    return this.parent
  } else {
    return this.val
  }
}

function getParent (val) {
  if (typeof this.val === 'string') {
    return val.parent
  } else {
    return this.parent
  }
}

function getSource (parent, obj) {
  if (!obj || !parent) {
    return
  }
  var newObj = {}
  var props = ['hls', 'dash', 'progressive']
  for (let i = 0; i < props.length; i++) {
    let key = props[i]
    let prop = obj[key]
    let val = (prop && prop.val) ? prop.val : prop
    if (val && typeof val === 'string') {
      newObj[key] = val
    }
  }
  return newObj
}

function handleSource () {
  var val = getVal.call(this)
  var parent = getParent.call(this, val)
  if (!val || !parent.rendered) {
    return
  }
  parent.ready.val = false
  parent.bitdashInstance
    .load(getSource.call(this, parent, val))
    .catch((err) => { handleError.call(this, err) })
}

function loadScript () {
  var opts = this.options
  var bitdashScript = document.createElement('script')
  bitdashScript.type = 'text/javascript'
  bitdashScript.src = opts && opts.bitdashScriptUrl
  bitdashScript.id = SCRIPT_ID
  bitdashScript.onload = () => {
    config.call(this)
  }
  document.getElementsByTagName('head')[0].appendChild(bitdashScript)
}

function config () {
  var opts = this.options
  /* global bitdash */
  var config = {
    key: opts.key,
    playback: {
      autoplay: false
    },
    tweaks: {
      file_protocol: true,
      app_id: 'io.vigour.app'
    },
    style: {
      ux: false,
      width: opts.width || '100%'
    },
    events: {
      onReady: () => {
        var videos = document.getElementsByTagName('video')
        for (let i = 0; i < videos.length; i++) {
          let video = videos[i]
          if (video.id.indexOf(this.node.id) === -1) {
            continue
          }
          video.setAttribute('webkit-playsinline', true)
        }
        this.emit('videoReady')
      },
      onPlaybackFinished: () => {
        this.emit('finished')
      },
      onFullscreenEnter: () => {
        this.fullscreen.val = true
      },
      onFullscreenExit: () => {
        this.fullscreen.val = false
      },
      onMute: () => {
        this.mute.val = true
      },
      onUnmute: () => {
        this.mute.val = false
      },
      onError: (reason) => {
        handleError.call(this, reason)
      }
    }
  }
  if (opts.advertising) {
    config.advertising = opts.advertising
  }
  config.source = getSource.call(this, this.source, this.source.val)
  var id = this.node.id
  var player = bitdash(id)
  player.setup(config).then((value) => {
    this.bitdashInstance = window.bitdashInstance = value
    this.emit('videoReady')
    this.emit('videoReadyFirstTime')
  }, (err) => { handleError.call(this, err) })
}

function handleError () {
  var reason = arguments.length === 1 && typeof arguments[0] === 'object' && arguments[0]
  var obs = this
  var player = obs.bitdashInstance
  var playerConfig = player.getConfig()

  if (reason) {
    console.error('Error on player', reason)
  }
  if (player && player.isSetup()) {
    if (obs.play.val === true && !player.isPlaying()) {
      // play is true but it's not player = player errored and stopped it
      // check if it's related to ad
      if (playerConfig.source && (playerConfig.source.hls || playerConfig.source.progressive || playerConfig.source.dash)) {
        if (obs.ad.play.val === true) {
          obs.ad.skip.val = true
        }
      }
    }
  }
}

function removeScript () {
  var script = document.getElementById(SCRIPT_ID)
  if (script) {
    script.remove()
  }
}
