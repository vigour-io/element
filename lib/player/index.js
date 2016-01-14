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
    if (node._ready) {// || player.ready.val === true) {
      exec.apply(this, arguments)
    }
  }
}

var VideoProperty = new Property({
  // on: {
  //   data () {}
  // },
  inject: [
    require('vigour-js/lib/operator/type'),
    require('vigour-js/lib/observable/is')
  ],
  define: {
    render
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
    },
    ready: new Property({
      on: {
        data () { }
      },
      render (node, event, player) {
        var val = this.val
        node._ready = val === true || false
        if (val === true) {
          player.each(function (prop, key) {
          }, function (prop, key) {
            if (prop && prop.exec && key !== 'ready') {
              prop.exec(node, event, player)
            }
          })
        }
      }
    })
  },
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
      this.dispose && this.dispose()
      this.ready.clearContextUp()
      this.ready.val = false

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
        // player.clearContextUp()
      }, time)
    }
  },
  // ready: false,
  time: {
    on: {
      data () {
        // console.log('TIME???', this.val)
      }
    }
  },
  // src: {
  //   // $type: 'string'
  // },
  play: {
    $type: 'boolean',
    exec (node, e, player) {
      if (this.val) {
        if (!player._interval) {
          let store = player.storeContext()
          player._interval = setInterval(function () {
            player.applyContext(store)
            let stamp = '$vp' + (cnt++)
            let event = new Event(
              'data',
              stamp
            )
            let time = player.getTime()
            // let buffer = player.getBuffer()
            player.time.origin.set(time, event)//, event)
            event.trigger()
            player.clearContextUp()
            // player.buffer.origin.set(buffer, event)
          }, 500)
        }
      } else {
        if (player._interval) {
          clearInterval(player._interval)
          player._interval = null
        }
      }
    }
  },
  duration: {
    $type: 'number'
  },
  volume: {
    $type: { range: [ 0, 1 ] },
    on: {
      data () {}
    }
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
