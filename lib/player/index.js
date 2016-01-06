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
    options: true
  },
  define: {
    isProgress (event) {
      return test.test(event.stamp)
    },
    toggle () {
      this.play.set(!this.play.val)
    },
    getNodeDelete (block, blocknode, hashed) {
      this.ready.val = false
      if (this._interval) {
        clearInterval(this._interval)
        this._interval = undefined
      }
      this.dispose()
    }
  },
  src: {
    $type: 'string'
  },
  play: {
    inject: require('vigour-js/lib/observable/is'),
    $type: 'boolean',
    render (node, event, element) {
      if (this.val) {
        if (!this._interval) {
          this._interval = setInterval(() => {
            var parent = this.parent
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
  // on: {
  //   remove () {
  //     removeInterval.call(this)
  //     this.dispose()
  //   }
  // },
  time: {
    inject: require('vigour-js/lib/observable/is'),
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
      inject: require('vigour-js/lib/observable/is'),
      $type: 'string'
    },
    play: {
      inject: require('vigour-js/lib/observable/is'),
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
