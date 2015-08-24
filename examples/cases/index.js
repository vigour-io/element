require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')
// var Observable = require('vjs/lib/observable')

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/background')
)

var cases = require('../../lib/cases')

cases.set({
  $bigscreen: {
    $val: app.$width,
    $transform: function(val, event) {
      return val > 400
    }
  },
  $connected: false
})

var a = new Element({
  // $css: 'funlife',
  $text: {
    $val: app.$width,
    $add:{
      $val:'???',
      $add:'!!@@'
    },
    $desktop: {
      $val: 'desktop, but not connected',
      $connected: 'I am connected!!',
      $bigscreen: 'BIG!'
    },
    $phone: {
      $val: 'bawler',
      $add: '!!!'
    }
  }
})

app.set({
  a: a,
  b: new a.$Constructor({
    c: new a.$Constructor()
  })
})