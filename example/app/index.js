require('./style.less')
var Element = require('../../lib/element')
var App = require('../../lib/app')

// window.base = new Obser()

// var app1 = new App({
//   inject: [
//     require('../../lib/property/css'),
//     require('../../lib/property/text'),
//     require('../../lib/events')
//   ],
//   text: {
//     // inject: require('vigour-js/lib/operator/subscribe'),
//     // $: 'width'
//     val:'regular DOM events'
//   },
//   on: {
//     // mousedown () {
//     //   console.log('mousedown')
//     // },
//     // mouseup () {
//     //   console.log('mouseup')
//     // },
//     // mousemove () {
//     //   console.log('mousemove')
//     // },
//     touchstart () {
//       console.log('touchstart')
//     },
//     touchmove () {
//       console.log('touchmove')
//     },
//     touchend () {
//       console.log('touchend')
//     }
//   }
// })

// var doc = require('../../lib/document')

// doc.set({
//   inject: require('../../lib/events/move'),
//   on: {
//     move () {
//       console.log('doc:move')
//     },
//     // touchstart() {
//     //   console.log('touchstart')
//     // },
//     // touchmove() {
//     //   console.log('touchmove')
//     // },
//     // touchend() {
//     //   console.log('touchend')
//     // }
//   }
// })

Element.prototype.inject(
  require('vigour-js/lib/operator/transform'),
  require('../../lib/property/text')
)

var app2 = new App({
  node:document.body,
  inject: [
    require('../../lib/property/css'),
    require('../../lib/property/text'),
    require('../../lib/events/nav/down'),
    require('../../lib/events/nav/right'),
    require('../../lib/events/nav/up'),
    require('../../lib/events/nav/left')
  ],

  // on:{
  //   arrowDown(e){
  //     e.preventDefault()
  //     console.log('-----DOWN')
  //   },
  //   arrowRight(e){
  //     e.preventDefault()
  //     console.log('-----RIGHT')
  //   },
  //   arrowLeft(e){
  //     e.preventDefault()
  //     console.log('-----LEFT')
  //   },
  //   arrowUp(e){
  //     e.preventDefault()
  //     console.log('-----UP')
  //   },
  // },

  list: {
    $transform:[1,2,3,4,5]
  }
  // dragThing: {
  //   inject: [
  //     require('../../lib/property/draggable'),
  //     require('../../lib/property/text')
  //   ],
  //   draggable:true,
  //   y:20,
  //   text:{
  //     inject: require('vigour-js/lib/operator/subscribe'),
  //     $:'y'
  //   }
  // }
})



// document.body.appendChild(app1.node)
// document.body.appendChild(app2.node)
