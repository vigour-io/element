'use strict'
var debug = require('vigour-js/lib/util/debug')

var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

var Seasons = new Element({
  $: 'season',
  text: { $: 'number' },
  seasons: {
    $collection: 'seasons',
    ChildConstructor: new Element({
      text: { $: 'title' }
    })
  }
}).Constructor

var X = new Element({
  type: 'ul',
  $collection: true,
  headerofX_shows: {
    type: 'h4',
    text: { $: 'title' }
  },
  ChildConstructor: new Element({
    type: 'li',
    text: {
      $: 'title'
    },
    nestedseasoncollection: {
      type: 'ul',
      $collection: 'shows',
      ChildConstructor: new Element({
        type: 'li',
        on: {
          click () {
            this.node.style.color = 'blue'
          }
        },
        text: { $: 'title' },
        season: new Seasons()
      })
    }
  })
}).Constructor

var Bla = new Element({
  css: 'blurf',
  properties: {
    shows: X
  }
}).Constructor

var ax = new Observable({
  number: 'number time ax!',
  seasons: {
    1: { title: ' season 1'},
    2: { title: ' season 2'}
  }
})

var b = new Observable({
    1: { title: 'top 1' },
    2: { title: 'top 2' },
    3: {
      title: 'top 3',
      shows: {
        1: {
          title: ' title 1',
          season: ax
        },
        2: {
          title: 'title 2',
          season: ax
        }
      }
    }
})

var c = new Observable({
    1: { title: 'c top 1' },
    2: { title: 'c top 2' },
    3: {
      title: 'c top 3',
      // shows: {}
      // shows: {
      //   1: {
      //     title: 'c title 1',
      //     season: ax
      //   }
      // }
    }
})
// var a = new Observable(b)

var blurf = new Bla({
  shows: b
})// blurf.val = a

app.set({
  a: blurf
})

// console.clear()
// console.log('here is blurf!', blurf.css)

global.blaxxx = Bla.prototype
// app.a.remove()
var blurf = new Bla({
  shows: b
})
// blurf.val = a

console.log('-------------------', Object.keys(app.nodes).length)

app.set({
  b: blurf
})


debug.context(app).log('before remove')

console.log('-------------------', Object.keys(app.nodes).length)
app.a.remove()

// app.set({
//   b: blurf
// })


console.log('keys of nodes', Object.keys(app.nodes).length)
debug.context(app).log('after remove REMOVE')

setTimeout(function () {
  // console.clear()
  debug.context(app).log('gotz it?')
  console.log(app.b.shows._input)
  app.b.shows.val = c

  // context has to go from app.b.shows ofcourse -- plus why contexT? its estrange
  debug.context(app).log('look at me now it? context after switch')
}, 500)
// app.clear()

global.b = b
global.c = c

setTimeout(function () {
  c[3].set({
    shows: {
      1: {
        title: 'c title 1',
        season: ax
      }
    }
  })
  debug.context(app).log('end context after set on c[3].shows[1]')
}, 1000)