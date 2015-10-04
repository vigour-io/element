require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')
// var Observable = require('vjs/lib/observable')

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/style'),
  require('../../lib/property/background') // ,
// require('../../lib/cases/inject')
)

var cases = require('../../lib/cases')

cases.set({
  bigscreen: {
    val: app.width,
    transform: function (val, event) {
      return val > 400
    }
  },
  connected: false
})

var a = new Element({
  // css: 'funlife',
  text: {
    val: app.width,
    desktop: {
      val: 'desktop, but not connected',
      connected: 'I am connected!!',
      bigscreen: 'BIG!'
    },
    add: {
      val: '???',
      add: '!!@@'
    },
    phone: {
      val: 'bawler',
      add: '!!!'
    }
  },
  // desktop:{
  style: {
    border: '10px solid blue'
  }
// }
})

app.set({
  a: a,
  b: new a.Constructor({
    c: new a.Constructor()
  })
})

app.b.set({
  style: {
    border: {
      val: '10px solid orange',
      bigscreen: '10px solid red'
    }
  }
})
