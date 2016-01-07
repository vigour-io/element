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
  // $: 'sho'
  type: 'ul',
  $collection: 'shows',
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
  $: true,
  css: 'blurf',
  properties: {
    shows: X
  },
  shows: {}
}).Constructor

var ax = new Observable({
  number: 'number time ax!',
  seasons: {
    1: { title: ' season 1'},
    2: { title: ' season 2'}
  }
})

var b = new Observable({
  shows: {
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
  }
})

var c = new Observable({
  shows: {
    1: { title: 'c top 1' },
    2: { title: 'c top 2' },
    3: {
      title: 'c top 3'
      // shows: {}
      // shows: {
      //   1: {
      //     title: 'c title 1',
      //     season: ax
      //   }
      // }
    }
  }
})
// var a = new Observable(b)

// var gurk

app.set({
  // val: b
  a: new Bla({
    val: b
  })
  // val: b
})

// console.clear()
// console.log('here is blurf!', blurf.css)

global.c = c
global.b = c
global.blaxxx = Bla.prototype
// app.a.remove()
console.log('-------------------', Object.keys(app.nodes).length)

app.set({
  b: new Bla({
    val: c
  })
  // val: b
})
