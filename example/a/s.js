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
      val: 'ws://localhost:3031'
      // val: 'ws://37.48.93.68:9000'
    }
  },
  jobs: {}
})


app.set({
  jobs: new Element({
    $: true,
    bla: {
      $collection: true,
      Child: {
        text: { $: 'filename' }
      },
    },
    val: hub.jobs
  })
})