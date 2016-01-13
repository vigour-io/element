'use strict'

const SCRIPT_ID = 'bitdash-script'
var Observable = require('vigour-js/lib/observable')
var instance

module.exports = {
  define: {
    getTime () {
      if (this.ready.val) {
        let player = instance
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
      var player = instance
      var current = player.getCurrentTime()
      var duration = player.getDuration()
      var bufferLength = player.getVideoBufferLength()
      if (current === duration) {
        return 1
      }
      return (current + bufferLength) / duration
    },
    dispose () {
      if (instance) {
        instance.unload()
        instance.destroy()
        removeScript()
        instance = null
      }
    }
  },
  // inject: [
  //   // require('../../../lib/event/render'),
  //   // require('./ad')
  // ],
  properties: {
    bitdashInstance: true
  },
  // ready: {
  //   $type: 'boolean',
  //   inject: require('vigour-js/lib/observable/is')
  // },
  // on: {
    // render: {
    //   bitdash (data) {
    //     window.addEventListener('error', () => {
    //       handleError.apply(this, arguments)
    //     })
    //     loadScript.call(this)
    //   }
    // },
    // videoReady: {
    //   bitdash (data, event) {
    //     if (!instance) {
    //       return
    //     }
    //     console.error('VIDEO READY')
    //     this.duration.set(Math.floor(instance.getDuration() + 1))
    //     this.volume.emit('data', null)
    //     this.ready.set(true)
    //     this.play.emit('data', null)
    //   }
    // },
    // videoReadyFirstTime: {
    //   bitdash (data, event) {
    //     this.time.emit('data', null)
    //   }
    // },
    // finished: {
    //   bitdash (data, event) {
    //     if (!this.ad.play.val) {
    //       this.play.val = false
    //     }
    //   }
    // }
  // },
  src: {
    define: {
      plain () {
        let obj = {}
        this.each(function (prop, key) {
          obj[key] = prop.val
        })
        return obj
      }
    },
    render (node, event, player) {
      if (hasSource.call(this)) {
        if (!instance) {
          init(player, node)
        } else {
          player.ready.val = false
          instance
            .load(this.plain())
            .catch((err) => { handleError.call(this, err) })
        }
      }
    },
    // ChildContructor: new Observable({
    //   on: {
    //     data (data, event) {
    //       // this.parent.emit('data', data, event)
    //     }
    //   }
    // })
  },
  play: {
    exec (node, event, player) {
      console.error('instance:', instance)
      if (!hasSource.call(this)) {
        return
      }
      console.error('VIDEO PLAY', this.val)
      if (this.val) {
        instance.play()
      } else {
        instance.pause()
      }
    }
  },
  volume: {
    exec (node, event, player) {
      if (!hasSource.call(this)) {
        return
      }
      instance.setVolume && instance.setVolume(this.val * 100)
    }
  },
  time: {
    exec (node, event, player) {
      if (!hasSource.call(this) || player.isProgress(event)) {
        return
      }
      let isPaused = !player.play.val
      if (isPaused) {
        player.play.val = true
      }
      instance.seek(player.duration.val * this.val)
      if (isPaused) {
        player.timeout('time', function(){
          player.play.origin.val = false
        }, 10)
      }
    }
  },
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

function hasSource () {
  var parent = this.parent
  return parent.src && (
    parent.src.dash ||
    parent.src.progressive ||
    parent.src.hls
  )
}

// function getVal () {
//   if (typeof this.val === 'string') {
//     return this.parent
//   } else {
//     return this.val
//   }
// }

// function getParent (val) {
//   if (typeof this.val === 'string') {
//     return val.parent
//   } else {
//     return this.parent
//   }
// }

// function getSource (parent, obj) {
//   if (!obj || !parent) {
//     return
//   }
//   var newObj = {}
//   var props = ['hls', 'dash', 'progressive']
//   for (let i = 0; i < props.length; i++) {
//     let key = props[i]
//     let prop = obj[key]
//     let val = (prop && prop.val) ? prop.val : prop
//     if (val && typeof val === 'string') {
//       newObj[key] = val
//     }
//   }
//   return newObj
// }

// function handleSource () {
//   var val = getVal.call(this)
//   var parent = getParent.call(this, val)
//   if (!val || !parent.rendered) {
//     return
//   }
//   parent.ready.val = false
//   parent.bitdashInstance
//     .load(getSource.call(this, parent, val))
//     .catch((err) => { handleError.call(this, err) })
// }

function init (player, node) {
  var opts = player.options
  var bitdashScript = document.createElement('script')
  bitdashScript.type = 'text/javascript'
  bitdashScript.src = opts && opts.bitdashScriptUrl
  bitdashScript.id = SCRIPT_ID
  bitdashScript.onload = () => {
    config(player, node)
  }
  document.getElementsByTagName('head')[0].appendChild(bitdashScript)
}

function config (player, node) {
  let store = player.storeContext()
  var opts = player.options
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
      onReady () {
        var videos = document.getElementsByTagName('video')
        for (let i = 0; i < videos.length; i++) {
          let video = videos[i]
          if (video.id.indexOf(player.node.id) === -1) {
            continue
          }
          video.setAttribute('webkit-playsinline', true)
        }
        player.applyContext(store)
        player.emit('videoReady')
      },
      onPlaybackFinished () {
        player.applyContext(store)
        player.emit('finished')
      },
      onFullscreenEnter () {
        player.applyContext(store)
        player.fullscreen.val = true
      },
      onFullscreenExit () {
        player.applyContext(store)
        player.fullscreen.val = false
      },
      onMute () {
        player.applyContext(store)
        player.mute.val = true
      },
      onUnmute () {
        player.applyContext(store)
        player.mute.val = false
      },
      onError (reason) {
        player.applyContext(store)
        handleError.call(player, reason)
      }
    }
  }
  if (opts.advertising) {
    config.advertising = opts.advertising
  }
  config.source = player.src.plain()
  var id = player.node.id
  var bitplayer = bitdash(id)
  bitplayer.setup(config).then(function (value) {
    player.applyContext(store)
    instance = window.bitdashInstance = value
    player.ready.val = true
    // player.emit('videoReady')
    // player.emit('videoReadyFirstTime')
  }, function (err) {
    handleError.call(player, err)
  })
}

function handleError () {
  var reason = arguments.length === 1 && typeof arguments[0] === 'object' && arguments[0]
  var obs = this
  var playerConfig = instance.getConfig()

  if (reason) {
    console.error('Error on instance', reason)
  }
  if (instance && instance.isSetup()) {
    if (obs.play.val === true && !instance.isPlaying()) {
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
