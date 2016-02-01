'use strict'
var app = require('../../lib/app')

var Element = require('../../lib/element')

var Hub = require('vigour-hub')

var hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: 'ws://jim.local:3031',
    scope: 'boite'
  }
})

var Show = new Element({
  $: true,
  inputtext: {
    type: 'input',
    value: { $: 'title' },
    on: {
      keyup () {
        this.value.origin.val = this.node.value
      }
    }
  }
}).Constructor

app.set({
  show: new Show(hub.get('shows.1', {}))
})
