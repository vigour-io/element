'use strict'
var currentState = require('../util/currentstate')
var screenfull = require('screenfull')
var Prop = require('../property')
var cases = require('../cases')
var TIMEUPDATE = 'timeupdate'
var scriptLoaded
var previousTime
var initialised
var instance
var setTime
var test = /\$vp/

var Base = require('vigour-js/lib/base')

var Property = new Prop({
  define: {
    compare (property, data, props, children, current, prev) {
      let key = property.key
      let stamp = property.getStamp(data)
      if (prev) {
        if (prev.state.props && prev.state.props[key] === stamp) {
          currentState(key, current, prev)
          return true
        }
      }
      currentState(key, current, prev)
      current.state.props[key] = stamp || property.getStamp(data)
    }
  }
}).Constructor

var VideoProp = new Property({
  properties: {
    render (fn) {
      this.define({
        render (val, properties, children, rdata, current, previous) {
          if (this.parent.ready.val) {
            fn.apply(this, arguments)
          }
        }
      })
    }
  }
}).Constructor

var InstantProp = new Property({
  define: {
    patch (event) {
      var stamp = event.stamp
      if (this._lstamp !== stamp) {
        let parent = this.parent
        if (parent && parent.state) {
          this.render(this.val)
          this._lstamp = stamp
        }
      }
    }
  }
}).Constructor

exports.define = {
  initialised: {
    set (val) {
      initialised = val
    },
    get () {
      return initialised
    }
  },
  instance: {
    set (val) {
      instance = val
    },
    get () {
      return instance
    }
  },
  setTime: {
    set (val) {
      setTime = val
    },
    get () {
      return setTime
    }
  },
  previousTime: {
    set (val) {
      previousTime = val
    },
    get () {
      return previousTime || 0
    }
  },
  loaded: {
    set (val) {
      scriptLoaded = val
    },
    get () {
      return scriptLoaded
    }
  }
}

exports.properties = {
  config: require('./config'),
  id: true,
  ready: new Property({
    $type: 'boolean',
    render (val, properties, children, rdata, current, previous) {
      let player = this.parent
      if (val) {
        let realDuration = player.getDuration()
        if (realDuration && realDuration > 0) {
          player.duration.origin.set(realDuration)
        }
        player.volume.render(player.volume.val)
        player.playing.render(player.playing.val)
        player.time.render(player.state.data.progress.val)
      } else {
        player.loading.origin.set(true)
      }
    }
  }),
  playing: new InstantProp({
    $type: 'boolean',
    render (val) {
      var player = this.parent
      var ready = player.ready.val
      if (val) {
        if (ready) {
          if (player.ended.val) {
            player.state.data.progress.set(0)
          }
          player.setInterval(TIMEUPDATE, function () {
            if (!this.isPlaying()) {
              // this.playing.origin.set(false)
            } else if (this.setTime) {
              this.loading.origin.set(true)
              if (this.setTime > this.getTime() + 1) {
                this.seek(this.setTime)
                this.previousTime -= 1
                this.setTime = this.previousTime
              } else {
                this.setTime = null
              }
            } else if (this.ready.val) {
              this.updateTime()
            }
          }, 500)
          player.play()
        }
      } else {
        player.loading.origin.set(false)
        player.clearInterval(TIMEUPDATE)
        player.setTime = null
        if (ready) {
          player.pause()
        }
      }
    }
  }),
  time: new Property({
    $type: 'number',
    render (val, properties, children, rdata, current) {
      var player = this.parent
      if (player.ready.val && (!current || !test.test(current.state.stamp))) {
        var duration = player.state.data.duration.val
        var time = val * duration
        player.setTime = time
        player.seek(time)
        player.updateEnded(time, duration)
        player.previousTime = time
      }
    }
  }),
  src: new Property({
    $type: 'string',
    render (val, properties, children, rdata, current, previous) {
      if (val) {
        var player = this.parent
        if (player.initialised) {
          player.ready.origin.set(false)
          player.ready.render(false)
          player.load(val)
        } else {
          player.init(val)
        }
      }
    }
  }),
  loading: new VideoProp({
    $type: 'boolean',
    render (val, properties, children, rdata, current) {
      var player = this.parent
      player.setVolume(val ? 0 : player.volume.val)
    }
  }),
  volume: new VideoProp({
    $type: 'number',
    render (val, properties, children, rdata, current) {
      this.parent.setVolume(val)
    }
  }),
  fullscreen: new InstantProp({
    $type: 'boolean',
    render: cases.$native.val
    ? function (val) {
      let videoNode = document.getElementById(this.parent.id)
      if (videoNode) {
        let node = videoNode.parentNode
        let style = node.style
        if (val) {
          let rect = node.getBoundingClientRect()
          document.body.style.marginTop = -rect.top + 'px'
          style.width = '100vh'
          style.height = '100vw'
          style.transform = 'rotate(90deg)'
          style.transformOrigin = '0 0'
          style.marginLeft = '100vw'
        } else {
          document.body.style.marginTop = 0
          style.width = null
          style.height = null
          style.transform = null
          style.transformOrigin = null
          style.marginLeft = null
        }
      }
    }
    : function (val) {
      if (screenfull.enabled) {
        let videoNode = document.getElementById(this.parent.id)
        if (videoNode) {
          let node = videoNode.parentNode
          if (val) {
            screenfull.request(node)
          } else {
            screenfull.exit()
          }
        }
      }
    }
  }),
  duration: new VideoProp({
    $type: 'number'
  }),
  muted: new VideoProp({
    $type: 'boolean'
  }),
  ended: new VideoProp({
    $type: 'boolean'
  }),
  ad: new VideoProp({
    $type: 'boolean'
  })
}

exports.inject = require('../event/fullscreen')

exports.on = {
  fullscreen (e) {
    this.fullscreen.origin.set(e.fullscreen)
  }
}
