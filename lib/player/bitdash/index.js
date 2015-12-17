'use strict'

const SCRIPT_ID = 'bitdash-script'

var BitdashPlayer = {
  define: {
    getTime () {
      return this.ready.val ? (this.bitdashInstance.getCurrentTime() / this.duration.val) : this.time.val
    },
    getBuffer () {
      if (!this.ready.val) {
        return 0
      }
      var bufferLength = this.bitdashInstance.getVideoBufferLength()
      var time = this.bitdashInstance.getCurrentTime()
      return (time + bufferLength) / this.duration.val
    },
    dispose () {
      var player = this.bitdashInstance
      var script = document.getElementById(SCRIPT_ID)
      player.unload()
      player.destroy()
      if (script) {
        script.remove()
      }
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
        loadDependencies.call(this)
      }
    },
    load: {
      bitdash (data, event) {
        this.source.emit('data', null, event)
        this.volume.emit('data', null, event)
      }
    },
    videoReady: {
      bitdash (data, event) {
        this.duration.set(Math.floor(this.bitdashInstance.getDuration() + 1))
        this.volume.emit('data', null)
        this.play.emit('data', null)
        this.time.emit('data', null)
        this.ready.set(true)
      }
    },
    finished: {
      bitdash (data, event) {
        this.play.set(false, event)
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

function handleSource () {
  var obj, parent
  var newObj = {}
  if (typeof this.val === 'string') {
    obj = this.parent
    parent = obj.parent
  } else {
    obj = this.val
    parent = this.parent
  }
  if (!obj || !parent.rendered) {
    return
  }
  var props = ['hls', 'dash', 'progressive']
  for (let i = 0; i < props.length; i++) {
    let key = props[i]
    let prop = obj[key]
    let val = (prop && prop.val) ? prop.val : prop
    if (val && typeof val === 'string') {
      newObj[key] = val
    }
  }
  parent.ready.val = false
  parent.bitdashInstance.load(newObj)
}

function loadDependencies () {
  var opts = this.options
  var bitdashScript = document.createElement('script')
  bitdashScript.type = 'text/javascript'
  bitdashScript.src = opts && opts.bitdashScriptUrl
  bitdashScript.id = SCRIPT_ID
  bitdashScript.onload = () => {
    /* global bitdash */
    var config = {
      key: opts.key,
      style: {
        ux: false,
        width: opts.width || '100%'
      },
      events: {
        onReady: () => {
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

        onPlay: () => {
          if (this.ready.val) {
            this.play.val = true
          }
        },
        onPause: () => {
          if (this.ready.val) {
            this.play.val = false
          }
        },

        onMute: () => {
          this.mute.val = true
        },
        onUnmute: () => {
          this.mute.val = false
        }
      }
    }
    if (opts.advertising) {
      config.advertising = opts.advertising
    }
    this.bitdashInstance = window.bitdashInstance = bitdash(this.node.id).setup(config)
    this.emit('load')
  }

  document.getElementsByTagName('head')[0].appendChild(bitdashScript)
}
