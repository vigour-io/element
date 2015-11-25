require('vigour-scratch/index.less')
require('./style.less')

var Element = require('../../lib/element')

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
  require('../../lib/animation'),
  require('../../lib/events/drag')
)

app.set({
  circle: {
    css: 'circle draggable',
    x: {
      val: 100,
      animation: {
        duration: 50
      }
    },
    y: {
      val: 200,
      animation: {
        duration: 16
      }
    },
    draggable: true,
    on: {
      dragend: function (e, event) {
        console.info('dragend')

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
      animation: {
        css: true,
        duration: 16,
        start: -1000
      }
    },
    y: {
      val: 600,
      animation: {
        css: true,
        duration: 18,
        start: 1000
      }
    }
  },
  triangle: {
    x: {
      val: 700,
      animation: {
        css: true,
        duration: 38
      }
    },
    y: {
      val: 100,
      animation: {
        css: true,
        duration: 6
      }
    }
  }
})
