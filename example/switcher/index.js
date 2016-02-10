'use strict'
require('./style.less')

var Switcher = require('../../lib/switcher')
var Observable = require('vigour-js/lib/observable')

var Data = new Observable({
  inject: require('vigour-element/lib/subscription/stamp'),
  ChildConstructor: 'Constructor'
}).Constructor

var Element = require('../../lib')

var app = global.app = new Element({
  DOM: document.body
})

var data = new Data({
  current: new Observable({
    title: 'flups'
  })
})

app.set({
  holder: {
    Child:{},
    properties: {
      // current: {
      //   text: {
      //     val: 'current!'
      //     // $: 'title'
      //   }
      // },
      discover: {
        text: {
          val: 'discover!'
          // $: 'title'
        }
      },
      shows: {
        text: {
          $: 'title'
        }
      }
    },
    $collection: true
  }
})

app.set(data)

setTimeout(function () {
  data.current.set(new Observable({
    key: 'discover',
    title: 'hahaha'
  }))
}, 1000)