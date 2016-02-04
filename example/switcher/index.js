'use strict'
require('./style.less')

var Switcher = require('../../lib/switcher')
var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib')

var app = global.app = new Element({
  DOM: document.body
})

var carousel = new Switcher({
  w: 300,
  h: 200,
  config: {
    axis: 'x',
    transition: {
      property: 'transform',
      duration: 1000
    }
  },
  $: true,
  ChildConstructor: new Element({
    $: true,
    text: {
      $: 'title'
    }
  }),
  next: {
    $: 'current'
  }
})

var data = new Observable({
  current: {
    // title:'smurr'
  }
})

global.app = app.set({
  holder: {
    carousel: new carousel.Constructor()
  },
  holder2: {
    carousel: new carousel.Constructor()
  }
})

// setInterval(function () {
//   data.current.val = new Observable({
//     key: Math.random(),
//     title: Math.random()
//   })
// }, 500)

var cnt = 1
var id = setInterval(function () {
  let key = Math.random()
    app.holder.carousel.setKey(key, {
      html: 'flups:' + key
    })
    app.holder2.carousel.setKey(key, {
      html: 'haha:' + key
    })
}, 100)

setTimeout(function () {
  app.holder.remove()
  // console.log('CLEAR', app.holder.carousel.__prevdata)
  clearInterval(id)
}, 1000)

// app.set({
//   elem1: {
//     x: 100,
//     html: 'ONE',
//     transition: {
//       property: 'transform'
//     }
//   },
//   // elem2: {
//   //   x: 300,
//   //   html: 'TWO'
//   // }
// })

// setTimeout(()=>{
//   console.log('------ remove!')
//   // app.set({
//   //   elem4: {
//   //     x: 700,
//   //     html: 'FOUR'
//   //   }
//   // })
//   // app.elem1.remove()
//   app.elem1.x.val = 300
// },100)