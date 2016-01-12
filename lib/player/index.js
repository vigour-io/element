'use strict'
var Event = require('vigour-js/lib/event')
var Property = require('../property')
var Element = require('../element')
var test = /\$vp/
var cnt = 0
function render (node, event, player) {
  let exec = this.exec
  if (exec) {
    if (player.ready.val === true) {
      exec.apply(this, arguments)
    }
  }
}

function storeContext () {
  let arr = []
  let context = this._context
  let level = this._contextLevel

  while (context) {
    arr.push(context, level)
    level = context._contextLevel
    context = context._context
  }

  return arr
}

function applyContext (store) {
  let target = this
  let context

  for (let i = 0; i < store.length; i) {
    context = store[i++]
    target._context = context
    target._contextLevel = store[i++]
    target = context
  }

  let parent = this
  while ((parent = parent.parent)) {}
}

var VideoProperty = new Property({
  inject: [
    require('vigour-js/lib/operator/type'),
    require('vigour-js/lib/observable/is')
  ],
  ChildConstructor: 'Constructor',
  define: {
    render,
    applyContext,
    storeContext
  },
  properties: {
    exec (val) {
      this.define({
        exec: val
      })
    }
  }
})

var Player = new Element({
  ChildConstructor: VideoProperty,
  properties: {
    _interval: true,
    _timeouts: {
      val: {}
    }
  },
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
      this.ready.val = false
      this.dispose()

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
    },
    applyContext,
    storeContext
  },
  ready: {
    val: false,
    render (node, event, player) {
      if (this.val === true) {
        player.each(function (prop, key) {
          if (key !== 'ready') {
            prop.exec(node, event, player)
          }
        })
      }
    }
  },
  src: {
    $type: 'string'
  },
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
            let buffer = player.getBuffer()
            player.time.origin.set(time, event)
            player.buffer.origin.set(buffer, event)
            event.trigger()
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
  time: {
    val:0,
    $type: { range: [ 0, 1 ] }
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

module.exports = Player.Constructor
