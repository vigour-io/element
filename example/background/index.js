require('vigour-scratch/index.less')
require('./style.less')

var Element = require('../../lib/element')
var Property = require('../../lib/property')

Element.prototype.inject(
  require('vigour-element/lib/animation'),
  require('vigour-element/lib/property/background')
)

var app = new Element({
  node: document.body
})

var mouse = new Property({
  x: 0,
  y: 0
})

var thing = new Element({
  inject: [
    require('../../lib/property/size'),
    require('../../lib/property/transform')
  ],
  width: 200,
  height: 200,
  background: {
    inject: [
      require('../../lib/property/background/size'),
      require('../../lib/property/background/position')
    ],
    x: {
      val: mouse.x,
      animation: { duration: 200 }
    },
    width: {
      val: 100,
      animation: { duration: 100 }
    },
    y: {
      val: mouse.y,
      animation: { duration: 200 }
    },
    val: 'https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg'
  },
  on: {
    click: function ( event ) {
      this.background.width.val += 100
    }
  }
})

var Img = new Element({
  background: {
    inject: require('../../lib/property/background/position')
  }
}).Constructor

var holder = new Element({})

for (var i = 0; i < 10; i++) {
  var t = new thing.Constructor({
    x: {
      val: mouse.x,
      animation: {
        duration: i / 16
      }
    }
  })
  holder.setKey(i, t)
}

app.set({
  holder: holder,
  on: {
    move: function (e, event) {
      mouse.x.val = e.pageX
      mouse.y.val = e.pageY
    },
    down: function (e, event) {
      mouse.x.val = e.pageX
      mouse.y.val = e.pageY
    }
  }
})
