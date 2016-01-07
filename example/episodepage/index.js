'use strict'
var debug = require('vigour-js/lib/util/debug')

var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

var Episodes = new Element({
  $collection: 'seasons.1.episodes',
  ChildConstructor: new Element({
    text: { $: 'title' }
  })
}).Constructor

var Show = new Element({
  $: true,
  title: {
    text: { $: 'title' }
  },
  currentEpisode: {
    $: 'seasons.1.episodes.1', // if it can find
    title: {
      text: { $: 'title' }
    }
  },
  episodes: new Episodes()
}).Constructor

var show = new Observable({
  title: 'show',
  seasons: {
    1: {
      number: { $: 'number' },
      episodes: {
        1: { title: ' 1.1', description: 'description 1' },
        2: { title: ' 1.2', description: 'description 2' }
      }
    },
    2: {
      number: { $: 'number' },
      episodes: {
        1: { title: ' 1.1', description: 'description 1' },
        2: { title: ' 1.2', description: 'description 2' }
      }
    }
  }
})

// console.clear()
app.set({
  b: new Show({
    val: show
  })
})
