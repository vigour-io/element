'use strict'
var currentState = require('../util/currentstate')
var Event = require('vigour-js/lib/event')
var Property = require('../property')
var test = /\$vp/
var cnt = 0

Property = new Property({
  define: {
    compare (property, data, props, children, current, prev) {
      let key = property.key
      if (prev && prev.state.stamp === current.state.stamp) {
        currentState(key, current, prev)
        return true
      }
      let stamp = property.getStamp(data)
      if (prev) {
        if (prev.state.props[key] === stamp) {
          currentState(key, current, prev)
          return true
        }
      }
      currentState(key, current, prev)
      current.state.props[key] = stamp
    }
  }
}).Constructor

exports.Child = new Property({
  properties: {
    render (fn) {
      this.define({
        render () {
          if (this.parent.ready.val) {
            fn.apply(this, arguments)
          }
        }
      })
    }
  }
}).Constructor

exports.properties = {
  config: require('./config'),
  initialised: true,
  instance: true,
  setTime: true,
  loaded: true,
  id: true,
  ready: new Property({
    $type: 'boolean',
    render (val, properties, children, rdata, current, previous) {
      if (val) {
        let player = this.parent
        player.loading.origin.set(false)
        player.volume.render(player.volume.val)
        player.playing.render(player.playing.val)
        player.time.render(player.state.data.time.val)
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
              // do the interval stuff
              if (ready && !player.interval) {
                let store = player.storeContext()
                player.interval = setInterval(function () {
                  player.applyContext(store)
                  if (player.setTime) {
                    player.setTime = null
                  } else if (player.ready.val) {
                    let time = player.getTime()
                    if (time) {
                      let stamp = '$vp' + (cnt++)
                      let event = new Event(
                        'data',
                        stamp
                      )
                      player.state.data.time.set(time, event)
                      event.trigger()
                    }
                  }
                }, 500)
              }
            } else if (player.interval) {
              clearInterval(player.interval)
              player.interval = null
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
          render (val, properties, children, rdata, current) {
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
          render (val, properties, children, rdata, current) {
            if (val) {
              var player = this.parent

              console.error('!!!!!!!!!!', player)

              if (player.initialised) {
                if (!test.test(current.state.stamp)) {
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
