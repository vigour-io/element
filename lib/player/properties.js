'use strict'
var Event = require('vigour-js/lib/event')
var Property = require('../property')
var test = /\$vp/
var cnt = 0

exports.Child = new Property({
  properties: {
    render (fn) {
      this.define({
        render (val) {
          if (this.parent.ready.val) {
            fn.apply(this, arguments)
          }
        }
      })
    }
  }
}).Constructor

exports.properties = {
  id: {
    val: 'vigour-player'
  },
  instance: true,
  config: require('./config'),
  ready: new Property({
    $type: 'boolean',
    render (val) {
      console.error('ready?', val)
      if (val) {
        this.parent.each((prop, key) => {
          if (key !== 'ready') {
            prop.render.apply(prop, arguments)
          }
        })
      }
    }
  }),
  play: new Property({
    $type: 'boolean',
    properties: {
      render (fn) {
        this.define({
          render (val) {
            var player = this.parent
            console.error('play!!', val, player.ready.val)
            if (val && player.ready.val) {
              // do the interval stuff
              if (!player.interval) {
                let store = player.storeContext()
                player.interval = setInterval(function () {
                  player.applyContext(store)
                  let time = player.getTime()
                  if (time) {
                    let stamp = '$vp' + (cnt++)
                    let event = new Event(
                      'data',
                      stamp
                    )
                    player.time.origin.set(time, event)
                    event.trigger()
                  }
                }, 500)
              }
              // then call the render
              fn.apply(this, arguments)
            } else if (this.interval) {
              clearInterval(this.interval)
              this.interval = null
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
            if (player.ready.val && !test.test(current.state.stamp)) {
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
              if (player.initialised.val) {
                fn.apply(this, arguments)
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