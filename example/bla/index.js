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
          // title: '2',
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
      shows: {
        1: {
          title: 'c title 1',
          season: ax
        }
      }
    }
})
// var a = new Observable(b)

var blurf = new Bla({
  shows: b
})// blurf.val = a

app.set({
  a: blurf
})

console.clear()
console.log('here is blurf!', blurf.css)

global.blaxxx = Bla.prototype
// app.a.remove()

var blurf = new Bla({
  shows: b
})
// blurf.val = a

app.set({
  b: blurf
})


app.set({
  b: blurf
})

setTimeout(function () {
  console.clear()
  console.log(app.b.shows._input)
  app.b.shows.val = c
}, 500)
// app.clear()
