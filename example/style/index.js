require('vigour-scratch/index.less')
require('./style.less')

var Element = require('../../lib/element')

var App = require('../../lib/app')
var app = new App({
  node: document.body
})

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/background/color'),
  require('../../lib/property/size'),
  require('../../lib/property/style')
)

var thing = new Element({
  text: 'Hello',
  css: 'hello',
  style: {
    backgroundColor: 'blue',
    position: 'absolute',
    left: '100px',
    width: '400px',
    height: '300px'
  },

  // size property has more power
  width: 200,
  height: 100
})

app.set({
  a: thing
})
