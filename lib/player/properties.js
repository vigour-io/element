'use strict'
var currentState = require('../util/currentstate')
var Event = require('vigour-js/lib/event')
var Property = require('../property')
var scriptLoaded
var test = /\$vp/
var cnt = 0

Property = new Property({
  define: {
    compare (property, data, props, children, current, prev) {
      let key = property.key
      if (prev && prev.state.stamp === current.state.stamp) {
        currentState(key, current, prev)
        console.log('111', key)
        return true
      }
      let stamp = property.getStamp(data)
      if (prev) {
        if (prev.state.props[key] === stamp) {
          currentState(key, current, prev)
          console.log('222', key)
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

exports.define = {
  // createStateProperty () {
  //   let define = {}
  //   for (let i = arguments.length - 1; i >= 0; i--) {
  //     let key = arguments[i]
  //     define[key] = {
  //       set (val) {
  //         if (this.state) {
  //           this.state.props[key] = val
  //         }
  //       },
  //       get () {
  //         return this.state && this.state.props[key]
  //       }
  //     }
  //   }
  //   this.define(define)
  // },
  initialised: {
    set (val) {
      if (this.state) {
        this.state.props.initialised = val
      }
    },
    get () {
      return this.state && this.state.props.initialised
    }
  },
  instance: {
    set (val) {
      if (this.state) {
        this.state.props.instance = val
      }
    },
    get () {
      return this.state && this.state.props.instance
    }
  },
  setTime: {
    set (val) {
      if (this.state) {
        this.state.props.setTime = val
      }
    },
    get () {
      return this.state && this.state.props.setTime
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
      console.error('READY:', val)
      let player = this.parent
      if (val) {
        console.log('LOADING false')
        player.loading.origin.set(false)
        player.volume.render(player.volume.val)
        player.playing.render(player.playing.val)
        player.time.render(player.state.data.time.val)
      } else {
        console.log('LOADING true')
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
              if (player.initialised) {
                if (!test.test(current.state.stamp)) {
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
