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
        console.log('##################### RENDER!!!!!!!!!!')
        loadDependencies.call(this)
      }
    },
    videoReady: {
      bitdash (data, event) {
        if (!this.bitdashInstance) {
          return
        }
        this.duration.set(Math.floor(this.bitdashInstance.getDuration() + 1))
        this.volume.emit('data', null)
        this.play.emit('data', null)
        this.ready.set(true)
      }
    },
    videoReadyFirstTime: {
      bitdash (data, event) {
        this.time.emit('data', null)
      }
    },
    finished: {
      bitdash (data, event) {
        // this.play.set(false)
        setTimeout(() => {
          var val = this.rahh.val
          this.rahh.val = val + '  ##FINISHED-' + this.time.val + '##'
        }, 50)
      }
    }
  },
  rahh: {
    val: 'initial'
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
          console.log('PLAY!@@@ #IS READY==========', this.parent.ready.val)
          this.parent.ready.is(true, () => {
            if (this.val) {
              console.log('PLAY');
              player.play()
            } else {
              console.log('PAUSE');
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
  console.log('HANDLE SOURCE')
  var val = getVal.call(this)
  var parent = getParent.call(this, val)
  parent.rahh.val += '  #HANDLE SOURCE## '
  if (!val || !parent.rendered) {
    return
  }
  parent.ready.val = false
  // parent.time.val = 0.01
  parent.bitdashInstance.load(getSource.call(this, parent, val))
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
      playback: {
        autoplay: true
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
        // onPlay: () => {
        //   if (this.ready.val === true) {
        //     this.play.val = true
        //   }
        // },
        // onPause: () => {
        //   if (this.ready.val === true) {
        //     this.play.val = false
        //   }
        // },
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
    }, function (reason) {
      console.error('Error while creating bitdash player instance', reason)
    })
  }

  document.getElementsByTagName('head')[0].appendChild(bitdashScript)
}
