'use strict'

require('./nika.less')
var Element = require('../../lib/element')
var App = require('../../lib/app')

var Property = require('../../lib/property')
Property.prototype.inject(
  // require('../../lib/animation'),
  // require('vigour-js/lib/operator/add')
)

Element.prototype.inject(
  require('../../lib/property/transform'),
  require('../../lib/property/css'),
  require('../../lib/property/size')
)

var Nika = new Element({
  css: 'nika',
  head: {},
  // body: {},
  x: {
    val: 0
      // $animation: 200
  },
  y: {
    val: 0
      // $animation: 200
  }
}).Constructor

var dirX = 0
var dirY = 0
var app
var dirXs = {}
var dirYs = {}

var cnt = 250

function loop () {
  window.requestAnimationFrame(function () {
    for (var i = 0; i < cnt; i++) {
      var x = app[i].x.val + (dirXs[i] * dirX)
      var y = app[i].y.val + (dirYs[i] * dirY)

      if (x > window.innerWidth) {
        dirXs[i] = dirX > 0 ? -1 : 1
      } else if (x < 0) {
        dirXs[i] = dirX > 0 ? 1 : -1
      }

      if (y > window.innerHeight) {
        dirYs[i] = dirY > 0 ? -1 : 1
      } else if (y < 0) {
        dirYs[i] = dirY > 0 ? 1 : -1
      }

      app[i].set({
        x: x,
        y: y
      })
    }
    // Nika.prototype.x.val = Nika.prototype.x.val + dirX
    // Nika.prototype.y.val = Nika.prototype.y.val + dirY
    loop()
  })
}
loop()

app = new App({ // eslint-disable-line
  node: document.body,
  on: {
    keydown (ev, event) {
      var code = ev.keyCode
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
          // this.setKey((nikas++), new Nika())
      }
      // if
    }
  }
})

for (var i = 0; i < cnt; i++) {
  app.setKey((i), new Nika({
    x: 5 * i * Math.cos(i / 100) + 250,
    y: 5 * i * Math.sin(i / 100) + 250
  }))
  dirXs[i] = 1
  dirYs[i] = 1
}
