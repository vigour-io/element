'use strict'
var debug = require('vigour-js/lib/util/debug')

var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

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
        }
      })
    }
  }
}).Constructor

var Show = new Element({
  $: true,
  title: {
    text: { $: 'title' }
  },
  currentEpisode: {
    text: 'currentEpisode',
    $: 'seasons.1.episodes.1', // if it can find
    title: {
      text: { $: 'number' }
    }
  },
  episodes: new Episodes(),
  seasons: new (new Element({
    text: 'seasons',
    ChildConstructor: new Element({
      text: { $: 'number' }
    }),
    $collection: 'seasons'
  })).Constructor()
}).Constructor

var show = new Observable({
  title: 'show',
  seasons: {
    1: {
      number: 1,
      episodes: {
        1: { number: ' 1.1', description: 'description 1' },
        2: { number: ' 1.2', description: 'description 2' }
      }
    },
    2: {
      number: 2,
      episodes: {
        1: { number: ' 1.1', description: 'description 1' },
        2: { number: ' 1.2', description: 'description 2' }
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

global.show = show