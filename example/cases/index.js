require('./style.less')

var Element = require('../../lib/element')
var App = require('../../lib/app')
var app = new App({
  node: document.body
})

var Observable = require('vigour-js/lib/observable')
Observable.prototype.inject(require('vigour-js/lib/operator/transform'))

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/style'),
  require('../../lib/property/background')
)

var cases = require('../../lib/cases')
cases.set({
  $bigscreen: false
})

app.set({
  inject: require('../../lib/cases/inject'),
  text: {
    inject: require('../../lib/cases/inject'),
    val: 'balls',
    $bigscreen: {
      val: 'randomString',
      $desktop: 'DESKTOP'
    },
    $phone: 'phone ballz'
  }
})

// var bla = new Observable({
//   inject: injectable,
//   val: 'YUZ MACHINE!',
//   $bigscreen: 'yuz'
// })

// bla.on(function () {
//   console.error('hey hey hey!', this.val)
// })

setInterval(function () {
  cases.$bigscreen.val = !cases.$bigscreen.val
}, 500)
