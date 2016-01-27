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

// bla.$({
//   shows: {
//     '*': {
//       title: {
//         val: true
//       }
//     }
//   }
// })

var Input = new Element({
  type: 'input',
  value: {},
  on: {
    keyup () {
      console.log('!!!WRONG!!!', this.value.origin)
      this.value.origin.val = this.node.value
    }
  }
}).Constructor

var Show = new Element({
  $: true,
  title: new Input({ value: { $: 'title' } }),
  switch: {
    type: 'button',
    text: 'swtich btn',
    on: {
      click () {
        var data = this.parent.origin
        var nr = Math.round(Math.random() * 10)
        console.log(nr)
        data.currentEpisode.val = data.get('seasons.0.episodes.' + nr, {})
      }
    }
  },
  episode: {
    $: 'currentEpisode',
    title: {
      text: { $: 'title' }
    },
    time: new Input({
      value: { $: 'time' }
    })
  }
  // seasons: {
  //   type: 'ul',
  //   $collection: 'currentSeason',
  //   Child: {
  //     type: 'li',
  //     text: {
  //       $: 'number'
  //     }
  //   }
  // }
}).Constructor

app.set({
  scope: new Input({ value: hub.adapter.scope }),
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
