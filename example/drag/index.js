require('./style.less')

var Element = require('../../lib/element')

var App = require('../../lib/app')

var app = new App({
  node: document.body
})

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/draggable')
)

var thing = window.thing = new Element({
  draggable: true,
  css: 'teste'
})

app.set({
  hello: new thing.Constructor()
})
