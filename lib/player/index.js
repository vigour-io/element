'use strict'
var Element = require('../element')
var Observable = require('vigour-js/lib/observable')
var Event = require('vigour-js/lib/event')
var cnt = 0
var test = /\$vp/
var Player = new Element({
  ChildConstructor: new Observable({
    ChildConstructor: 'Constructor',
    inject: require('vigour-js/lib/operator/type')
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
    }
  },
  src: {
    $type: 'string'
  },
  play: {
    $type: 'boolean',
    on: {
      data: {
        interval () {
          if (this.val) {
            if (!this._interval) {
              this._interval = setInterval(() => {
                var parent = this.parent
                var event = new Event(
                  parent.time.origin,
                  'data', '$vp' + (cnt++)
                )
                var time = parent.getTime()
                var buffer = parent.getBuffer()
                parent.time.origin.set(time, event)
                parent.buffer.origin.set(buffer)
              }, 500)
            }
          } else {
            // removeInterval.call(this)
          }
        }
      }
    }
  },
  on: {
    remove () {
      removeInterval.call(this)
      this.dispose()
    }
  },
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

function removeInterval () {
  if (this._interval) {
    clearInterval(this._interval)
    this._interval = undefined
  }
}

module.exports = Player.Constructor
