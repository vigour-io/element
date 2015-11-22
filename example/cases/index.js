require('./style.less')

var App = require('../../lib/app')
var Element = require('../../lib/element')
var app = new App({
    node: document.body
  })
  // var Observable = require('vigour-js/lib/observable')

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/style'),
  require('../../lib/property/background')
)

var cases = require('../../lib/cases')

cases.set({
  bigscreen: {
    val: app.width,
    transform(val, event) {
      return val > 400
    }
  },
  connected: false
})

var a = new Element({
  // css: 'funlife',
  text: {
    inject: require('../../lib/cases').injectable,
    val: 'smurr',
    $phone: {
      inject: require('../../lib/cases').injectable,
      val: 'bawler',
      $touch: 'funsies'
    }
  }
  // desktop:{
  // style: {
  //   border: '10px solid blue'
  // }
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
