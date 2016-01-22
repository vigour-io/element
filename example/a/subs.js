'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor
var debug = require('../../lib/util/debug')
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
    websocket: 'ws://localhost:3031'
  },
  val: 'a val',
  flups: 'a flup',
  gurkens: 'a gurkens',
  shows: {}
})

bla.$({
  lulz: {
    val: true
  }
}, void 0, function (map, attach, ready) {
  global.alert('xxx')
})

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
    on: {
      keyup () {
        this.value.origin.val = this.node.value
      }
    }
  },
  holder: {
    $collection: 'shows',
    Child: {
      text: { $: 'title' }
    }
  }
})

app.set({
  xxx: {
    text: 'marcus'
  },
  bla: new thing.Constructor(bla.get('smurt.smarts', {}))
})

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
