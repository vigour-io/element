'use strict'

console.clear()

require('./style.less')

var Element = require('../../lib/element')
var Property = require('../../lib/property')

Property.prototype.inject(
  require('../../lib/animation')
)

var App = require('../../lib/app')
var app = new App({
  node: document.body
})

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/transform'),
  require('../../lib/property/opacity'),
  require('../../lib/property/transition'),
  require('../../lib/property/draggable'),
  require('../../lib/events/drag'),
  require('../../lib/animation')
)


app.set({
  circle: {
    css: 'circle draggable',
    x: {
      val: 100,
      on : {
        transitionEnd () {
          debugger
        }
      }
    },
    y: {
      val: 200,
      on : {
        transitionEnd () {
          debugger
        }
      }
    },
    draggable: true,
    on: {
      dragend: function (e, event) {
        app.rectangle.setKey('x', this.x.val + Math.random() * 450)
        app.rectangle.setKey('y', this.y.val + Math.random() * 450)

        app.triangle.setKey('x', e.x - Math.random() * 450)
        app.triangle.setKey('y', e.y - Math.random() * 450)
      }
    }
  },
  rectangle: {
    x: {
      val: 400,
      on : {
        transitionEnd () {
          console.log('65 x')
        }
      },
      $animation: {
        duration: 16,
        start: -1000
      }
    },
    y: {
      val: 600,
      on : {
        transitionEnd () {
         console.log('77 y')
        }
      },
      $animation: {
        duration: 18,
        start: 1000,
      }
    }
  },
  triangle: {
    x: {
      val: 700,
      on : {
        transitionEnd () {
          debugger
        }
      },
      $animation: {
        css: true,
        duration: 38
      }
    },
    y: {
      val: 100,
      on : {
        transitionEnd () {
          debugger
        }
      },
      $animation: {
        css: true,
        duration: 6
      }
    }
  }
})
