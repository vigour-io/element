'use strict'

const SCRIPT_ID = 'bitdash-script'

var BitdashPlayer = {
  define: {
    getTime () {
      return this.ready.val ? (this.bitdashInstance.getCurrentTime() / this.duration.val) : 0
    },
    getBuffer () {
      if (!this.ready.val) {
        return 0
      }
      return (this.bitdashInstance.getCurrentTime() + this.bitdashInstance.getVideoBufferLength()) / this.duration.val
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
        this.duration.set(this.bitdashInstance.getDuration(), event)
        this.volume.emit('data', null, event)
        this.play.emit('data', null, event)
        this.ready.set(true, event)
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
            player.seek(parent.duration.val * this.val)
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
    this.bitdashInstance = window.bitdashInstance = bitdash(this.node.id).setup({
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
        onFullscreenExit: () => {
          this.fullscreen.val = false
        }
      }
    })
    this.emit('load')
  }

  document.getElementsByTagName('head')[0].appendChild(bitdashScript)
}
