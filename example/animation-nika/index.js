'use strict'

require('./nika.less')
var App = require('../../lib/app')

var Property = require('../../lib/property')
Property.prototype.inject(
  require('../../lib/animation')
)

var Element = require('../../lib/element')
Element.prototype.inject(
  require('../../lib/property/transform'),
  require('../../lib/property/css'),
  require('../../lib/property/size')
)

var Nika = new Element({
  css: 'nika',
  head: {},
  x: {
    val: 0,
    $animation: {
      duration: 32
    }
  },
  y: {
    val: 0,
    $animation: {
      duration: 32
    }
  }
}).Constructor

var dirX = 0
var dirY = 0
var app
// var dirXs = {}
// var dirYs = {}

var cnt = 250

// var winX = window.innerWidth
// var winY = window.innerHeight

app = new App({
  node: document.body,
  on: {
    keydown (ev, event) {
      let code = ev.keyCode

      if (code === 39) {
        dirX += 1
      } else if (code === 37) {
        dirX -= 1
      } else if (code === 40) {
        dirY += 1
      } else if (code === 38) {
        dirY -= 1
      } else if (code === 13) {
        dirX = 0
        dirY = 0
      }

      updateIt()
    }
  }
})

function updateIt () {
  for (let i = 0; i < cnt; i++) {
    app.setKey((i), new Nika({
      x: {
        val: 5 * i * Math.cos(i / 100) + 250
      },
      y: {
        val: 5 * i * Math.sin(i / 100) + 250
      }
    }))

    // var x = app[i].x.val + (dirXs[i] * dirX)
    // var y = app[i].y.val + (dirYs[i] * dirY)

    // if (x > winX) {
    //   x = dirX > 0 ? -1 : 1
    // } else if (x < 0) {
    //   x = dirX > 0 ? 1 : -1
    // }

    // if (y > winY) {
    //   y = dirY > 0 ? -1 : 1
    // } else if (y < 0) {
    //   y = dirY > 0 ? 1 : -1
    // }

    // dirXs[i] = 1
    // dirYs[i] = 1
  }
}
