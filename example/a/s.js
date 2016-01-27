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

hub.$({
  codes: {
    '*': {
      val: true
    }
  }
})

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
    text: 'currentEpisode swtich btn',
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
  },
  holder: {
    $: 'currentSeason',
    switch: {
      type: 'button',
      text: 'currentSeason swtich btn',
      on: {
        click () {
          var data = this.parent.parent.origin
          var nr = Math.round(Math.random() * 7)
          console.log(nr)
          data.currentSeason.val = data.get('seasons.' + nr, {})
        }
      }
    },
    text: { $: 'number' },
    episodes: {
      type: 'ul',
      $collection: 'episodes',
      Child: {
        type: 'li',
        text: { $: 'title' },
        time: new Input({
          value: { $: 'time' }
        }),
        on: {
          click () {
            var data = this.lookUp('_input.currentEpisode')
            data.val = this.origin
          }
        }
      }
    }
  }
}).Constructor

app.set({
  codes: {
    type: 'ul',
    $collection: 'codes',
    Child: {
      type: 'li',
      text: {
        $: true,
        $prepend () {
          console.log(this.origin.key)
          return this.origin.key
        }
      }
    },
    val: hub
  },
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
