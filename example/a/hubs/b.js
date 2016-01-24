'use strict'

var Hub = require('vigour-hub')

var b = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: {
      server: 5051
      // val: 'ws://localhost:5052'
    }
    // val: 'ws://localhost:5051'
  },
  clients: {},
  jobs: {}
})

b.clients.on('property', function (data) {
  console.log(data)
})

b.jobs.on('property', function (data) {
  console.log('got job info!', data)

  if (data.added) {
    data.added.forEach((key) => {
      console.log(this[key], this[key].toString())
    })
  }
  // console.log('--->', th)
})

