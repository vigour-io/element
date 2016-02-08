'use strict'
var currentState = require('../util/currentstate')
var Property = require('../property')
var TIMEUPDATE = 'timeupdate'
var scriptLoaded
var initialised
var instance
var setTime
var test = /\$vp/

Property = new Property({
  define: {
    compare (property, data, props, children, current, prev) {
      let key = property.key
      let stamp
      if (prev) {
        if (prev.state.stamp === current.state.stamp) {
          currentState(key, current, prev)
          return true
        }
        stamp = property.getStamp(data)
        if (prev.state.props[key] === stamp) {
          currentState(key, current, prev)
          return true
        }
      }
      currentState(key, current, prev)
      current.state.props[key] = stamp || property.getStamp(data)
    }
  }
}).Constructor

exports.Child = new Property({
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
        player.loading.origin.set(false)
        player.volume.render(player.volume.val)
        player.playing.render(player.playing.val)
        player.time.render(player.state.data.time.val)
      } else {
        player.loading.origin.set(true)
      }
    }
  }),
  playing: new Property({
    $type: 'boolean',
    properties: {
      render (fn) {
        this.define({
          render (val) {
            var player = this.parent
            var ready = player.ready.val
            if (val) {
              if (ready) {
                player.setInterval(TIMEUPDATE, function () {
                  if (this.setTime) {
                    this.setTime = null
                  } else if (this.ready.val) {
                    this.updateTime()
                  }
                }, 500)
              }
            } else {
              player.clearInterval(TIMEUPDATE)
              player.setTime = null
            }
            if (ready) {
              fn.apply(this, arguments)
            }
          }
        })
      }
    }
  }),
  time: new Property({
    $type: 'number',
    properties: {
      render (fn) {
        this.define({
          render (val, properties, children, rdata, current, previous) {
            var player = this.parent
            if (player.ready.val && (!current || !test.test(current.state.stamp))) {
              player.setTime = val
              fn.apply(this, arguments)
            }
          }
        })
      }
    }
  }),
  src: new Property({
    $type: 'string',
    properties: {
      render (fn) {
        this.define({
          render (val, properties, children, rdata, current, previous) {
            if (val) {
              var player = this.parent
              if (player.initialised) {
                if (player.instance) {
                  player.ready.origin.set(false)
                  player.ready.render(false)
                  fn.apply(this, arguments)
                }
              } else {
                player.init(val)
              }
            }
          }
        })
      }
    }
  }),
  duration: new exports.Child({
    $type: 'number'
  })
}
