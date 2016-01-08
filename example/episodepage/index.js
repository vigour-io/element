'use strict'
var debug = require('vigour-js/lib/util/debug')

var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

var Title = new Element({
  css: 'titlex',
  text: {
    $: 'title'
  }
}).Constructor

Element.prototype.properties = {
  title: Title
}

var Episodes = new Element({
  text: 'epis',
  gurky: {
    murky: {
      $collection: 'seasons.1.episodes',
      ChildConstructor: new Element({
        blurf: {
          text: {
            $: 'number'
          }
        },
        finewine:{
          balls: new Title({
            text:{
              $add:'flups'
            }
          })
        },
        title: {}
      })
    }
  }
}).Constructor

var Show = new Element({
  $: true,
  // title: {},
  // currentEpisode: {
  //   text: 'currentEpisode',
  //   $: 'seasons.1.episodes.1', // if it can find
  //   title: {
  //     text: { $: 'number' }
  //   }
  // },
  episodes: new Episodes(),
  // seasons: new (new Element({
  //   text: 'seasons',
  //   ChildConstructor: new Element({
  //     text: { $: 'number' }
  //   }),
  //   $collection: 'seasons'
  // })).Constructor()
}).Constructor

var show = new Observable({
  title: 'show',
  seasons: {
    1: {
      number: 1,
      episodes: {
        1: {
          number: '1.1.1', description: 'description 1',
          title: 'this is title 1.1.1'
        },
        2: {
          number: '1.1.2', description: 'description 2',
          // title: 'this is title 1.1.1'
        }
      }
    },
    2: {
      number: 2,
      episodes: {
        1: { number: '1.1.1', description: 'description 1' },
        2: { number: '1.1.2', description: 'description 2' }
      }
    }
  }
})

var show2 = new Observable({
  title: 'show 2',
  seasons: {
    1: {
      number: 1,
      episodes: {
        1: { number: ' 2.1.1', description: 'description 1' },
        gurk: { number: ' 2.1.gurk', description: 'description gurk' },
        2: { number: ' 2.1.2', description: 'description 2', title: 'this is title 2.1.2' }
      }
    },
    2: {
      number: 2,
      episodes: {
        1: { number: ' 2.1.1', description: 'description 1' },
        2: { number: ' 2.1.2', description: 'description 2' }
      }
    }
  }
})
var C = new Element({
  // $:true,
  thisisthebreaker: {
    ChildConstructor: new Element({
      text: { $: 'text' },
      ChildConstructor: new Element({
        // $: true,
        text: { $: 'number' }
      }),
      $collection: 'episodes'
    }),
    $collection: 'seasons' // if it can find
  }
}).Constructor

var A = new Element({
    text: 'currentEpisode',
    magic: new C()
  }).Constructor

var Page = new Element({
  $:true,
  a: new A(),
  b: new A(),//{ bla: new Title() }
  // show:new Show(),
  // another:new Show()
}).Constructor

app.set({
  switcher:{
    page: new Page(show)
     // page: new Page(show)
  }
})

// app.switcher.xx.page.set(show2)

window.app = app
window.page = Page.prototype
// setTimeout(function(){
//   app.switcher.page.remove()
// },2000)

setTimeout(function(){
  app.switcher.set({
    xxx: { html: '</br>--------------------' },
    page2:new Page(show2)
  })
},500)


setTimeout(function () {
   app.switcher.set({
    xxx: { html: '</br>---------SWAPPED-----------' }
  })
  app.switcher.page.val = show2
  app.switcher.page2.val = show
}, 1000)
// console.clear()
// app.set({
//   b: new Show({
//     val: show
//   })
// })

// // app.b.remove()

// setTimeout(function () {
//   // app.b.remove()
//   app.b.val = show2
// }, 500)


// setTimeout(function () {
//   app.b.remove()
//   app.set({
//     c: new Show({
//       val: show2
//     })
//   })
// }, 1000)

// setTimeout(function () {
//   show2.seasons.set({
//     5: {
//       number: 5,
//       episodes: {
//         1: {
//           title: 'gurken 5.1.1',
//           number: '5.1.1'
//         }
//       }
//     }
//   })
// }, 1100)

// global.show = show
// global.show2 = show2

global.wl = function walklisteners (obs, cnt) {
  var x
  if (!cnt) {
    x = true
    cnt = { cnt: 0 }
  }
  // cnt.cnt++
  obs.each(function (p, key) {
    walklisteners(p, cnt)
  })
  if (obs._on) {
    if (obs._on.data && obs._on.data.attach) {
      cnt.cnt++
    }
  }
  if (x) {
    console.log('listeners!', cnt.cnt)
  }
}

