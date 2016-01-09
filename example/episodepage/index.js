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

var show = global.show = new Observable({
  title: 'show',
  currentSeason: {},
  seasons: {
    1: {
      currentEpisode: {},
      number: 1,
      episodes: {
        1: { number: ' 1.1.1', description: 'description 1' },
        2: { number: ' 1.1.2', description: 'description 2', title: 'this is title 1.1.2' }
      }
    },
    2: {
      currentEpisode: {},
      currentSeason: {},
      number: 2,
      episodes: {
        1: { number: ' 1.2.1', description: 'description 1' },
        2: { number: ' 1.2.2', description: 'description 2' }
      }
    }
  }
})

var show2 = new Observable({
  title: 'show 2',
  currentSeason: {},
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
      currentSeason: {},
      number: 2,
      episodes: {
        1: { number: ' 2.2.1', description: 'description 1' },
        2: { number: ' 2.2.2', description: 'description 2' }
      }
    }
  }
})

// show2.seasons[1].currentEpisode.val = {
//   number: '!!!!!'
// }
show.set({ currentEpisode: show.seasons[1].episodes[1]})

show2.set({ currentEpisode: show2.seasons[1].episodes.gurk})

show2.seasons[1].currentEpisode.val = show2.seasons[1].episodes.gurk
show2.currentSeason.val = show2.seasons[1]

show.seasons[1].currentEpisode.val = show.seasons[1].episodes.gurk
show.currentSeason.val = show.seasons[1]

// var currentEpidose

var C = new Element({
  nested2: {
    title: { text: { $: 'title' } },
    switchSeason: {
      type: 'button',
      text: { $add: ' season', $: 'currentSeason.number' },
      on: {
        click () {
          console.clear()
          var origin = this.parent.parent.parent.parent.origin
          var current = origin.currentSeason.origin
          var seasons = origin.seasons
          var keys = []
          var index = 0
          seasons.each((p, k) => {
            keys.push(k)
            if (k === current.key) {
              index = keys.length - 1
            }
          })
          var nextKey = (keys[++index] || keys[0])
          origin.currentSeason.val = origin.seasons[nextKey]
        }
      }
    },
    currentEpisode: {
      $: 'currentEpisode',
      title: {
        text: { $: 'number' }
      }
    },
    currentSeason: {
      $: 'currentSeason',
      title: {
        text: { $: 'number' }
      },
      episodes: {
        type: 'ul',
        $collection: 'episodes',
        ChildConstructor: new Element({
          type: 'li',
          text: { $: 'number' }
        })
      }
    },
    seasons: {
      ChildConstructor: new Element({
        css: 'season',
        text: {
          $: 'number',
          $transform (val) { return val || this.origin.key } // does not work yet
        }, // also make possible to use things like 'key' going to be sweety ballz
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
                  var current = this.parent._input
                  var origin = this.parent.parent.parent.origin
                  var episodes = origin.episodes
                  var keys = []
                  var index = 0
                  episodes.each((p, k) => {
                    keys.push(k)
                    if (k === current.key) {
                      index = keys.length - 1
                    }
                  })
                  var nextKey = (keys[++index] || keys[0])
                  origin.currentEpisode.val = episodes[nextKey]
                }
              }
            }
          }
        },
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
  // b: new A() // { bla: new Title() }
  // show:new Show(),
  // another:new Show()
}).Constructor

app.set({
  switchpage: {
    type: 'button',
    text: 'switch page',
    on: {
      click () {
        console.clear()
        var page = this.parent.switcher.page
        page.val = (page.origin === show ? show2 : show)
      }
    }
  },
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

console.clear()

show2.seasons[1].episodes[2].remove()