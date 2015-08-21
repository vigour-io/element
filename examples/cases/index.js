require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')

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
  $css: 'funlife',
  $text: {
    $val: app.$width,
    $phone: {
      $val: 'bawler',
      $add: '!!!'
    },
    $desktop: {
      $val: 'desktop, but not connected',
      $connected: 'I am connected!!',
      $bigscreen: 'BIG!'
    }
  },
  //TODO: $background: { $val: '#hex | rgb | rgba() ', $image: '' , $size: { }, $load, $position, $noRepeat } << do it like this better!
  $background: {
    $val: 'http://www.cdc.gov/importation/images/dog2.jpg'
  }
})

app.set({
  a: a,
  b: new a.$Constructor({
    c: new a.$Constructor()
  })
})
