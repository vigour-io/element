'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor
var Event = require('vigour-js/lib/event')
require('./style.less')

// // var event = require('../../lib/event')
// // ******************** CONFIG ********************
// var n = 2
// // ************************************************

// var Title = new Element({
//   type: 'h3',
//   text: 'yo'
// }).Constructor

// var Thing = new Element({
//   css: 'thing',
//   // rick: {
//   //   type: 'section',
//   //   text: 'yo ricks!'
//   // },
//   img: {
//     type: 'img',
//     src: 'http://localhost:3032/cat.png'
//   },
//   on: {
//     click (data, event) {
//       this.getNode().style.border = (Math.random() * 3 + 1) + 'px solid blue'
//     }
//   },
//   theText: {
//     text: 'MURDER KAPOT!',
//     on: {
//       click (ev, event) {
//         this.node.style.border = '1px solid red'
//         this.text.set(Math.random() * 999)
//       }
//     }
//   },
//   title: new Title({
//     text: {
//       val: function () {
//         return this.parent.val
//       }
//       // $transform () {
//       //   return 'xxxx'
//       // }
//     },
//     on: {
//       click (data, event) {
//         this.remove()
//       },
//       flabber (data, event) {
//         console.log('FLABBER', this.path, data, event)
//       }
//     }
//   })
// }).Constructor

// Thing.prototype.title.on('data', function () {
//   var node = this.getNode()
//   // console.log('yes here')
//   if (node) {
//     // console.log('yes here go render')
//     this.text.render(node)
//     this.text.clearContext()
//   }
// })

// // ****************** RENDER PART **********************
// console.time('creation')

// var holder = new Element({
//   css: 'holder',
//   '0': {
//     type: 'h1',
//     text: n
//   }
// })

// global.obs = new Observable({
//   define: {
//     updateAll () {
//       // console.time('update')
//       var ev = new Event()
//       this.each(function (p) {
//         p.set(Math.random() * 919, ev)
//       })
//       ev.trigger()
//       // console.timeEnd('update')
//       // debug.context(app).log('after updateAll')
//     }
//   }
// })
// // var event = new Event(holder, 'data')
// for (let i = 1; i < n + 1; i++) {
//   global.obs.setKey(i, i * 100)
//   let a = global.obs[i]
//   holder.setKey(i, new Thing({ title: a }, false), false)
// }
// // console.log('xxxx')

// var Hello = new Element({
//   hello: {
//     xxx: {
//       type: 'button',
//       inject: require('vigour-element/lib/event/down'),
//       on: {
//         down () {
//           console.log('yo yo yo', this.path)
//           this.set({
//             thing: {
//               text: Math.random()*9999
//             }
//           })
//         }
//       },
//       text: 'xxx'
//     }
//   }
// }).Constructor

// // Bla.Constructor

// var Bla = new Element()

// Bla.Constructor

// Bla.set({
//   text: 'bla',
//   nestedhello: new Hello({
//     text: 'nestedhello',
//     yo: { text: 'yo' }
//   })
// })


// var Sidebar = new Element({
//   key: 'sidebar',
//   menu: {}
// }).Constructor
// // Sidebar.p

// console.log('---------- CONTEXT ----------')
// // console.clear()

// var Sidebar = new Sidebar({
//   menu: {
//     discover: {
//       text: 'discover',
//       on: {
//         click () {
//           this.node.style.border = Math.random() * 9 + 'px solid blue'
//         }
//       }
//     }
//   }
// }).Constructor

// var first = new Element({

// })

// app.set({
//   first: new first.Constructor({
//     // properties: {
//     //   sidebar: Sidebar
//     // },
//     sidebar: new Sidebar({
//       properties: {
//         james: new Element({
//           bla: true
//         })
//       },
//       menu: {
//         discover: {
//           on: {
//             click () {
//               this.node.style.border = Math.random() * 9 + 'px solid purple'
//             }
//           }
//         }
//       },
//       james: {}
//     })
//   })
// })

// delete First.prototype.sidebar.menu._Constructor
// First.prototype.sidebar.menu.Constructor
var A = new Element({
  bla: {
    text: 'haha',
    on: {
      down (d, e) {
        this.remove(e)
        // this.set({
          // text: 'xxxx'
        // })
      }
    }
  }
}).Constructor

var Bla = new Element({
  tx: {
    menu: new A()
  }
}).Constructor

var holder = new Bla({
  tx: {},
  xy: new A(),
  z: new A()
})

app.set({
  btn: {
    type: 'button',
    text: 'clear',
    on: {
      down () {
        this.parent.switcher.clear()
      }
    }
  },
  btn2: {
    type: 'button',
    text: 'make',
    on: {
      down () {
        this.parent.set({ switcher: { [Math.random()]: { text: Math.random() * 9999 }}})
      }
    }
  },
  switcher: {
    ChildConstructor: A
  },
  hh: new holder.Constructor()
  // first: new First()
})

// // console.timeEnd('creation')
module.exports = app

// if (!require('vigour-js/lib/util/is/node')) {
//   setInterval(function () {
//     global.obs.updateAll()
//   })
// }
