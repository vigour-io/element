'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

var Hub = require('vigour-hub')

var hub = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: {
      val: 'ws://localhost:3031',
      connected: {
        on: {
          data () {
            console.log('yo connect!')
          }
        }
      }
    },
    scope: 'james'
  },
  jobs: {}
})

app.set({
  jobs: new Element({
    $collection: 'jobs',
    Child: {
      type: 'li',
      bla: {
        $collection: true,
        Child: {
          text: { $: true }
        }
      }
    },
    val: hub
  })
})
