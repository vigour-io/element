require('./style.less')

var App = require('../../lib/app')
var Element = require('../../lib/element')

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text')
)

var thing = new Element({
  text: 'Hello',
  css: 'hello',
  dragable: true
})

var app = new App({
  a: thing
})
