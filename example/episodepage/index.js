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
      currentEpisode: {},
      number: 1,
      episodes: {
        1: { number: ' 2.1.1', description: 'description 1' },
        gurk: { number: ' 2.1.gurk', description: 'description gurk' },
        smurk: { number: ' 2.1.smurk', description: 'description smurk' },
        2: { number: ' 2.1.2', description: 'description 2', title: 'this is title 2.1.2' }
      }
    },
    2: {
      currentEpisode: {},
      number: 2,
      episodes: {
        1: { number: ' 2.1.1', description: 'description 1' },
        2: { number: ' 2.1.2', description: 'description 2' }
      }
    }
  }
})

// show2.seasons[1].currentEpisode.val = {
//   number: '!!!!!'
// }

show2.seasons[1].currentEpisode.val = show2.seasons[1].episodes.gurk

// var currentEpidose

var C = new Element({
  nested2: {
    title: { text: { $: 'title' } },
    seasons: {
      ChildConstructor: new Element({
        episode: {
          title: {
            $: null,
            text: 'currentEpisode'
          },
          epi: {
            $: 'currentEpisode',
            text: { $: 'number' },
            nextEpisode: {
              type: 'button',
              text: 'nextEpisode',
              on: {
                click () {
                  console.clear()
                  // this has to work get('../../../')
                  var current = this.parent._input
                  var origin = this.parent.parent.parent.origin
                  if (origin && origin.episodes) {
                    console.log(origin, current)
                  }
                  show2.seasons[1].currentEpisode.val = show2.seasons[1].episodes.smurk

                  // current.
                  // this.parent.parent.parent.origin.each(function (p, key) {
                  //   console.log('yo!', key, p)
                  // })
                  // this.parent.origin.val = this.parent.parent.origin

                }
              }
            }
          }
        },
        text: {
          $: 'number',
          $transform (val) { return val || this.origin.key } // does not work yet
        }, // also make possible to use things like 'key' going to be sweety ballz
        episodes: {
          ChildConstructor: new Element({
            text: { $: 'number' }
          }),
          $collection: 'episodes'
        }
      }),
      $collection: 'seasons' // if it can find
    }
  }
}).Constructor

var A = new Element({
  text () { return this.parent.key },
  nested1: new C()
}).Constructor

var Page = new Element({
  css: 'page',
  text: 'page',
  $: true,
  a: new A(),
  b: new A() // { bla: new Title() }
  // show:new Show(),
  // another:new Show()
}).Constructor

app.set({
  switcher: {
    page: new Page(show2)
     // page: new Page(show)
  }
})

// app.switcher.xx.page.set(show2)

window.app = app
window.page = Page.prototype


// console.clear()
// show2.seasons[1].currentEpisode.val = show2.seasons[1].episodes.smurk

// setTimeout(function(){
//   app.switcher.page.remove()
// },2000)

// setTimeout(function(){

//   // show.seasons[1].remove()
// app.switcher.page.val = show2
//   app.switcher.set({
//     xxx: { html: '</br>--------------------' },
//     page2:new Page(show2)
//   })
// },500)


// setTimeout(function () {
//    app.switcher.set({
//     xxx: { html: '</br>---------SWAPPED-----------' }
//   })
//   app.switcher.page.val = show2
//   app.switcher.page2.val = show
// }, 1000)
// console.clear()
// app.set({
//   // b: new Show({
//   //   val: show
//   // })
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



global.show = show
global.show2 = show2