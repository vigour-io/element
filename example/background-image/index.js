require('./style.less')
var App = require('../../lib/app')
var Element = require('../../lib/element')
var Property = require('../../lib/property')

var app = new App({
  node:document.body
})

Property.prototype.inject(require('../../lib/animation'))

Element.prototype.inject(
  require('../../lib/property/transition'),
  require('../../lib/property/text')
)

var mouse = new Property({
  key: 'mouse',
  x: {
    val: 1,
    animation: {
      duration: 36
    }
  },
  y: {
    val: 1,
    animation: {
      duration: 36
    }
  }
})

var thing = new Element({
  inject: [
    require('../../lib/property/background'),
    require('../../lib/property/size'),
    require('../../lib/property/transform')
  ],
  background: {
    inject: require('../../lib/property/background/position')
  },
  width: 20,
  height: 20
})

var Img = new Element({
  background: {
    inject: require('../../lib/property/background/position')
  }
}).Constructor

var holder = new Element({})

for (var i = 0; i < 50; i++) {
  var t = new thing.Constructor({
    define: {
      i: i
    },
    width: 128,
    height: 128,
    background: {
      val: 'http://33.media.tumblr.com/avatar_948e40c89497_128.png',
      x: { val: mouse.x },
      y: { val: mouse.y }
    }
  })

  holder.setKey(i, t)
}

app.set({
  holder: holder
})

mouse.x.val = 200
mouse.y.val = 200

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
