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
  holder: new Switcher({
    w: 200,
    h: 200,
    x: 200,
    config: {
      transition: {
        property: 'transform',
        duration: 1000
      }
    },
    Child: {
      text: {
        $: 'title'
      }
    },
    $put: 'current'
  })
})

app.set(data)

function make () {
  setTimeout(function () {
    data.current.set(new Observable({
      key: 'discover',
      title: 'DISCOVER!!'
    }))
    // setTimeout(function () {
    //   data.current.set(new Observable({
    //     key: 'shows',
    //     title: 'SHOWS!!!'
    //   }))
    //   setTimeout(function () {
    //     data.current.set(new Observable({
    //       key: 'discover',
    //       title: 'DISCOVER!!'
    //     }))
    //     setTimeout(function () {
    //       data.current.set(new Observable({
    //         key: 'shows',
    //         title: 'SHOWS!!!'
    //       }))
    //       // make()
    //     }, 1000)
    //   }, 100)
    //   // make()
    // }, 100)
  }, 100)
}

make()