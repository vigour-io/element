require('vigour-scratch/index.less')
require('./style.less')

var Element = require('../../lib/element')
var app = new Element({
  node: document.body
})

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/draggable')
)

var thing = new Element({
  text: 'Hello',
  css: 'hello',
  dragable: true
})

app.set({
  a: thing
})
