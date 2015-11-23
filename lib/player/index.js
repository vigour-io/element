'use strict'
var Element = require('../element')
var Observable = require('vigour-js/lib/observable')
var Event = require('vigour-js/lib/event')
var cnt = 0

var Player = new Element({
  ChildConstructor:new Observable({
    inject: require('vigour-js/lib/operator/type')
  }).Constructor,
  properties: {
    _interval: true
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
                // parent.time.val = Math.random()
                // var event = new Event(
                //   parent.time,
                //   'data', '$vp' + (cnt++)
                // )
                parent.set({
                  time:parent.getTime()
                },event)
                // parent.time.set(parent.getTime(), event)
              }, 500)
            }
          }
        }
      }
    }
  },
  on: {
    remove: {
      interval () {

      }
    }
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
  buffer: {
    $type: { range: [ 0, 1 ] }
  }
})

module.exports = Player.Constructor
