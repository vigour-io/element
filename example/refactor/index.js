'use strict'
var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')

require('./bla.less')
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
      this.$(val.$map(), void 0, false, val)
    }
    return _on.apply(this, arguments)
  }
})

// Syncable.prototype._on.data.onRemoveProperty = function (base, type) {
//   if (base.storedmap) {
  // this is safer -- but may be too heavy or not nessecary... when doing event:false it does not unsub now
//     // this is the next thing to optmize of course...
//     console.error('UNSUBSCRIBE!', base.storedmap)
//     // need to hash it? -- prob nice to all add to the map creator (should give me a subs)
//   }
// }

// Syncable.prototype.set({
  // on attach add!
// })

var Hub = require('vigour-hub')
var hub = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: 'ws://37.48.93.68:5052',
    scope: '#james'
    // websocket: 'ws://'
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
  css: 'shows',
  Child: {
    css: 'show',
    title: {
      text: { $: 'title' }
    },
    img: {
      type: 'img',
      src: { $: 'img' }
    },
    description: {
      html: { $: 'description' }
    },
    on: {
      drag (ev) {
        console.log('!!!')
      },
      down (ev) {
        console.log('xxxxx', this.path, ev)
        // var
        // console.clear()
        console.log('--- start resolving ----')
        this.set({
          bla: {
            text: 'xxxx!@!@#!@#'
          }
        })
        console.log('---- end resolve ----')
      }
    }
  },
  $collection: true
}).Constructor

var Discover = new Element({
  Child: {
    text: { $: 'title' },
    shows: new Shows({
      $collection: 'items'
    })
  },
  $collection: true
}).Constructor


var Bla = new Element({
  text: {}
}).Constructor

app.set({
  key: 'app',
  holder: {
    btn2: {
      type: 'button',
      text: 'switchit',
      on: {
        up () {
          if (this.parent.shows) {
            this.parent.shows.remove()
            this.parent.set({
              discover: new Discover(hub.get('discover', {}))
            })
          } else {
            this.parent.discover.remove()
            this.parent.set({
              shows: new Shows(hub.get('shows', {}))
            })
          }
        }
      }
    },
    discover: new Discover(hub.get('discover', {}))
  },
  holder2: {
    xx: new Bla('xxxxxx')
  }
})

//// ws://37.48.93.68:5051
