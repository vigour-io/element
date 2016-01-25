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
  shows: {}
})

var Shows = new Element({
  type: 'ul',
  $collection: 'shows',
  Child: {
    type: 'li',
    text: {
      $: 'title'
    }
  }
}).Constructor

var Show = new Element({
  $: true,
  text: { $: 'title' },
  seasons: {
    type: 'ul',
    $collection: 'currentSeason',
    Child: {
      type: 'li',
      text: {
        $: 'number'
      }
    }
  }
}).Constructor

app.set({
  // shows: new Shows(hub),
  show: new Show(hub.get('shows.2', {}))
})

// setTimeout(function () {
//   hub.set({
//     adapter: {
//       websocket: 'ws://bla.local'
//     }
//   })
// }, 1000)
