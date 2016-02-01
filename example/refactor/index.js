'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

// // require('./style.less')
// var Hub = require('vigour-hub')

// var hub = global.hub = new Hub({
//   adapter: {
//     inject: require('vigour-hub/lib/protocol/websocket'),
//     websocket: {
//       val: 'ws://jim.local:3031'
//     },
//     scope: 'james' // 'scope_' + Math.round(Math.random() * 9999)
//   }
// })

require('./element/render')