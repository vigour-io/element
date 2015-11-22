require('vigour-scratch/index.less')
require('./style.less')

var Element = require('../../lib/element')
var app = new Element({
  node: document.body
})

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/background/color'),
  require('../../lib/property/style')
)

var thing = new Element({
  text: 'Hello',
  css: 'hello',
  style: {
    backgroundColor: 'blue',
    position: 'absolute',
    left: '100px'
  }
})

app.set({
  a: thing
})
