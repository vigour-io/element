'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor
// var debug = global.debug = require('vigour-hub/lib/debug')
require('./style.less')

var a = global.a = new Observable({
  val: 'a val',
  flups: 'a flup',
  gurkens: 'a gurkens',
  shows: {
    1: { textx: '?' },
    2: { textx: 'x' },
    3: { textx: 'x' }
  }
})

var Hub = require('vigour-hub/')

// wrong
var bla = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: 'ws://localhost:3031',
    scope: 'yoxxxx'
  },
  val: 'a val',
  flups: 'a flup',
  gurkens: 'a gurkens',
  shows: {}
})

// bla.$({
//   lulz: {
//     val: true
//   }
// }, void 0, function (map, attach, ready) {
//   // global.alert('xxx')
// })

// global.debug = true

var input = {
  keyup (data, event) {
    // very fucked!
    this.value.origin.origin.set(this.node.value, event)
  }
}

var thing = new Element({
  $: true,
  // text: { $: true },
  // xxx: {
  //   text: { $: 'hello' }
  // },
  bla: {
    type: 'input',
    value: {
      $: 'gurkens'
    },
    on: input
  },
  holder: {
    $collection: 'shows',
    Child: {
      // type: 'input',
      text: { $: 'title' },
      holder: {
        $: 'currentEpisode',
        text: { $: 'title' },
        bla: {
          text: { $prepend: 'time:', $: 'time' }
        }
      }
      // on: input
    }
  }
})

var seasons = new Element({
  $collection: 'episodes',
  Child: {
    text: { $: 'title' },
    bla: {
      $: 'parent.parent',
      text: {
        $prepend: 'parentparent????',
        $: 'title'
      }
    }
  }
})

app.set({
  xxx: {
    text: 'marcus'
  },
  // bla: new thing.Constructor(bla.get('smurt.smarts', {})),
  // blax: new thing.Constructor(bla.get('smurt.smarts', {})),
  blaaa: new Element({
    type: 'button',
    $: 'currentEpisode',
    text: { $: 'title' },
    // bla: {
    //   $: 'parent.parent.parent.parent',
    //   text: {
    //     $prepend: 'parentparent????',
    //     $: 'title'
    //   }
    // },
    on: {
      click () {
        console.log('yo set', this._input)
        console.log(Math.round(Math.random() * 10))
        bla.get('shows.1.currentEpisode', {}).val = bla.get('shows.1.seasons.1.episodes', {}).get('' + Math.round(Math.random() * 10), {})
      }
    },
    // val: bla.get('shows.1', {})
    // bla: seasons
  })
})

app.set({
  haha: {
    $: true,
    text: { $: 'title' },
    val: bla.get('shows.1', {}),
    on: {
      click () {
        var nr = this.origin.key
        // if (nr == 2) {
        //   this.node.style.border = '10px solid purple'
        // } else {
        //   this.node.style.border = '3px solid pink'
        // }
        this.val = bla.get('shows.' + (nr == 1 ? 2 : 1), {})
        // this.val = nr == 2 ? false : bla.get('shows.' + (nr == 1 ? 2 : 1), {})
      }
    }
  }
})
// after this changing!
// setTimeout(() => {
//   console.clear()
//   console.log('\n\n\n\n\n remove this!!!!')
//   app.bla.remove()
// }, 1500)

// setTimeout(() => {
//   console.clear()
//   console.log('\n\n\n\n\n remove this!!!!')
//   app.blax.remove()
// }, 2500)

// bla.adapter.websocket.connected.is(true, function () {
//   console.log('zzzzzzzzzzzzz')
//   setTimeout(() => {
//     bla.get('LATER!!!!', {}).$({
//       YOYOYOYOYOYOLATER: { val: true }
//     }, void 0, function () {
//       // we need a stamp for the subs also add the binder etc
//       console.log('done!')
//     })
//   }, 100)
// })

// reference changes need to clean up stuff
//