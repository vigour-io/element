'use strict'
var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')

require('./bla.less')
// temp solution
var Syncable = require('vigour-hub/lib/syncable')
Syncable.prototype.inject(require('../../lib/subscription/stamp'))

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
    websocket: 'ws://localhost:3033',
    // scope: '#james'
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
      type: 'input',
      value: { $: 'title' },
      on: {
        keyup () {
          console.log('KEYS!')
        }
      }
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
        console.log('--- start resolving ----')
        this.set({
          bla: {
            text: 'xxxx!@!@#!@#'
          }
        })
        console.log('---- end resolve ----')
        // console.log('keys on app.col', app.col.keys())
        console.log('keys on ChildConstructor [shows child]', Shows.prototype.Child.prototype.keys())
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
    shows: new Shows(hub.get('shows', {}))
  },
  holder2: {
    xx: new Bla('xxxxxx')
  }
})

//// ws://37.48.93.68:5051
