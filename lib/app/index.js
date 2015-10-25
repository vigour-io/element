'use strict'

// TODO make app instances possible

// make app configurable -- without body

var Element = require('../../lib/element')
var Observable = require('vjs/lib/observable')

var app = module.exports = new Element({
  key: 'app',
  // node: document.body,
  properties: {
    width: Observable,
    height: Observable
<<<<<<< HEAD
  }
})

app.rendered = true

;(window.onresize = function () {
  var w = window.innerWidth
  var h = window.innerHeight
  app.set({
    width: w,
    height: h
  })
})()
=======
  },
  // rendered: true
}).Constructor


// var isNode = require('vjs/lib/util/is/node')

// if (!isNode) {
//   ;(window.onresize = function () {
//     var w = window.innerWidth
//     var h = window.innerHeight
//     app.set({
//       width: w,
//       height: h
//     })
//   })()
// }
>>>>>>> feature/Animation
