'use strict'
var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')

// temp solution
var Syncable = require('vigour-hub/lib/syncable')
var _set = Syncable.prototype.set
var _on = Syncable.prototype.on

Syncable.prototype.define({
  set () {
    var r = _set.apply(this, arguments)
    if (this._on && this._on.data.base) {
      for (let i in this._on.data.base) {
        let prop = this._on.data.base[i]
        if (prop instanceof Element) {
          prop.patch()
          break
        }
      }
    }
    return r
  },
  on (type, val) {
    if (val.$map) {
      this.$(val.$map())
    }
    return _on.apply(this, arguments)
  }
})

// Syncable.prototype.set({
  // on attach add!
// })

var Hub = require('vigour-hub')
var hub = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: 'ws://37.48.93.68:5051'
  }
})

// hub.$({
//   shows: {
//     '*': {
//       title: { val: true },
//       img: { val: true }
//     }
//   }
// })

var app = global.app = new Element({
  DOM: document.body
})

var Shows = new Element({
  Child: {
    // text: {
    //   $: 'title'
    // },
    img: {
      type: 'img',
      src: { $: 'img' },
      // $transform (val) {
      //   return val && `https://imgmtvplay-a.akamaihd.net/image/400/300?url=${val}`
      // }
    },
    title: {
      text: { $: 'title' }
    }
  },
  $collection: 'shows'
}).Constructor

app.set({
  shows: new Shows(hub)
})

//// ws://37.48.93.68:5051

