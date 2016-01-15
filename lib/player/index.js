'use strict'
var Event = require('vigour-js/lib/event')
var Property = require('../property')
var Element = require('../element')
var test = /\$vp/
var cnt = 0

function render (node, event, player) {
  let exec = this.exec
  if (exec) {
    // node fix
    if (player.ready.val === true) {// || player.ready.val === true) {
      exec.apply(this, arguments)
    }
  }
}

var VideoProperty = new Property({
  inject: [
    require('vigour-js/lib/operator/type')
  ],
  define: {
    render,
    set (val, event) {
      let type = typeof val
      if (type === 'boolean' || type === 'number' || type === 'string') {
        if (val !== this._input) {
          this._input = val
          if (event === void 0) {
            this._on.data.execInternal(this, event = new Event('data'))
            // this.render(void 0, event, this.parent)
            event.trigger()
          } else {
            this._on.data.execInternal(this, event)
          }
        }
      } else {
        Property.prototype.set.apply(this, arguments)
      }
    }
  },
  properties: {
    exec (val) {
      this.define({
        exec: val
      })
    }
  },
  ChildConstructor: 'Constructor'
}).Constructor

var Player = new Element({
  properties: {
    options: true,
    _interval: true,
    _timeouts: {
      val: {}
    }
  },
  inject: require('vigour-track'),
  ChildConstructor: VideoProperty,
  define: {
    isProgress (event) {
      return test.test(event.stamp)
    },
    toggle () {
      this.play.origin.set(!this.play.val)
    },
    getNodeDelete (block, blocknode, hashed) {
      for (var id in this._timeouts) {
        clearTimeout(this._timeouts[id])
        this._timeouts[id] = null
      }
      if (this._interval) {
        clearInterval(this._interval)
        this._interval = null
      }
      this.dispose()
      this.each(function () {
      }, function (prop) {
        if (prop instanceof VideoProperty) {
          let type = typeof prop._input
          if (type === 'boolean' || type === 'number' || type === 'string') {
            delete prop._input
          }
        }
      })

      // clean up all values
      // here

      Element.prototype.getNodeDelete.apply(this, arguments)
    },
    timeout (id, fn, time) {
      if (typeof id === 'function') {
        time = fn
        fn = id
      }
      if (this._timeouts[id]) {
        clearTimeout(this._timeouts[id])
        this._timeouts[id] = null
      }
      let player = this
      let store = player.storeContext()
      this._timeouts[id] = setTimeout(function () {
        player.applyContext(store)
        fn(player)
      }, time)
    }
  },
  time: {},
  ready: {
    render (node, event, player) {
      var val = this.val
      if (val === true) {
        player.each(function (prop, key) {
        }, function (prop, key) {
          if (prop && prop.exec && key !== 'ready') {
            prop.exec(node, event, player)
          }
        })
      }
    }
  },
  play: {
    val: false,
    exec (node, e, player) {
      if (this.val) {
        if (!player._interval) {
          let store = player.storeContext()
          player._interval = setInterval(function () {
            player.applyContext(store)
            let time = player.getTime()
            if (time) {
              let stamp = '$vp' + (cnt++)
              let event = new Event(
                'data',
                stamp
              )
              // console.log(' update origin time: ', time)
              player.time.origin.set(time, event)//, event)
              event.trigger()
            }
            // let buffer = player.getBuffer()
            // player.buffer.origin.set(buffer, event)
          }, 500)
        }
      } else {
        if (player._interval) {
          clearInterval(player._interval)
          player._interval = null
        }
      }
    },
    track: {
      data: true
    }
  },
  duration: 0,
  volume: {
    $type: { range: [ 0, 1 ] }
  },
  mute: {
    $type: 'boolean'
  },
  fullscreen: {
    $type: 'boolean'
  },
  buffer: {
    $type: { range: [ 0, 1 ] }
  },
  ad: {
    src: {
      $type: 'string'
    },
    play: {
      $type: 'boolean'
    },
    volume: {
      $type: { range: [ 0, 1 ] }
    },
    duration: {
      $type: 'number'
    },
    buffer: {
      $type: { range: [ 0, 1 ] }
    },
    canSkip: {
      $type: 'boolean'
    },
    skip: {
      $type: 'boolean'
    }
  }
})

module.exports = exports = Player.Constructor
exports.Property = VideoProperty
