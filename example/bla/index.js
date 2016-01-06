'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

var Season = new Element({
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
    blar: {
      type: 'ul',
      $collection: 'shows',
      ChildConstructor: new Element({
        type: 'li',
        text: { $: 'title' },
        season: new Season()
      })
    }
  })
}).Constructor

var Bla = new Element({
  properties: {
    shows: X
  }
}).Constructor

var ax = new Observable({
  number: 'number time ax!',
  seasons: {
    1: { title: 'season 1'},
    2: { title: 'season 2'}
  }
})

var b = new Observable({
  // shows: {
    1: { title: '1' },
    2: { title: '2' },
    3: {
      title: '3',
      shows: {
        1: {
          title: '1' ,
          season: ax
        },
        2: {
          title: '2',
          season: ax
        }
      }
    }
  // }
})

// var a = new Observable(b)

var blurf = new Bla({
  shows: b
})// blurf.val = a

app.set({
  a: blurf
})

app.a.remove()

var blurf = new Bla({
  shows: b
})
// blurf.val = a

app.set({
  a: blurf
})

// app.a.remove()
