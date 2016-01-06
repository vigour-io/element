'use strict'
var Element = require('../element')
var Property = require('../property')
var Event = require('vigour-js/lib/event')
var cnt = 0
var test = /\$vp/

var Player = new Element({
  ChildConstructor: new Property({
    inject: [
      require('vigour-js/lib/operator/type'),
      require('vigour-js/lib/observable/is')
    ],
    ChildConstructor: 'Constructor',
    render () {
      // console.info('no render defined for:', this.key)
    }
  }),
  properties: {
    _interval: true,
    options: true,
    _timeouts: {
      val: {}
    }
  },
  define: {
    isProgress (event) {
      return test.test(event.stamp)
    },
    toggle () {
      this.play.set(!this.play.val)
    },
    getNodeDelete (block, blocknode, hashed) {
      for (var id in this._timeouts) {
        clearTimeout(this._timeouts[id])
        this._timeouts[id] = null
      }
      this.ready.val = false
      if (this._interval) {
        clearInterval(this._interval)
        this._interval = undefined
      }
      this.dispose()
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
      this._timeouts[id] = setTimeout(fn, time)
    }
  },
  src: {
    $type: 'string'
  },
  play: {
    inject: require('vigour-js/lib/observable/is'),
    $type: 'boolean',
    render (node, event, parent) {
      if (this.val) {
        if (!this._interval) {
          this._interval = setInterval(() => {
            var stamp = '$vp' + (cnt++)
            var event = new Event(
              'data',
              stamp
            )
            var time = parent.getTime()
            var buffer = parent.getBuffer()
            parent.time.origin.set(time, event)
            parent.buffer.origin.set(buffer, event)
            event.trigger()
          }, 500)
        }
      }
    }
  },
  ready: {
    $type: 'boolean'
  },
  time: {
    $type: { range: [ 0, 1 ] }
  },
  duration: {
    $type: 'number'
  },
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

module.exports = Player.Constructor
