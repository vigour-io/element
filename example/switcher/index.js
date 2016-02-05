'use strict'
require('./style.less')

var Switcher = require('../../lib/switcher')
var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib')

var app = global.app = new Element({
  DOM: document.body
})

var switcher = new Switcher({
  w: 300,
  h: 200,
  config: {
    axis: 'x',
    transition: {
      property: 'transform',
      duration: 1000
    }
  },
  ChildConstructor: new Element({
    $: true,
    html: {
      $: 'title'
    }
  }),
  next: {
    $: 'current'
  }
})

var data = new Observable({
  current: {}
})

global.app = app.set({
  holder: {
    switcher: new switcher.Constructor(data)
  },
  // holder2: {
  //   switcher: new switcher.Constructor()
  // }
})

data.current.set(new Observable({
  title: 'heeee'
}))

// setInterval(function () {
//   data.current.val = new Observable({
//     key: Math.random(),
//     title: Math.random()
//   })
// }, 500)

var cnt = 1
var id = setInterval(function () {
  let key = Math.random()
  app.holder.switcher.set({[key]: new Observable({
    key: key,
    title: key
  })})
    // data.current.set(new Observable({
    //   key: key,
    //   title: key
    // }))
    // app.holder.switcher.set({[key]: {
    //   html: 'flups:' + key
    // }})
  //   // app.holder2.switcher.set({[key]: {
  //   //   html: 'haha:' + key
  //   // }})
}, 1000)

// setTimeout(function () {
//   clearInterval(id)
// }, 1000)