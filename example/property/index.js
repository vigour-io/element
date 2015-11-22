require('vigour-scratch/lib/mixins.less')
require('./style.less')

var Element = require('../../lib/element')
var app = new Element({
  node: document.body
})

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/transform'),
  require('../../lib/property/draggable'),
  require('../../lib/property/size')
)

window.thing = thing = new Element({
  text: '?xxx?',
  x: 100,
  y: 100,
  draggable: true
})

app.set({
  a: new thing.Constructor({
    text: '>>xx>'
  })
})

var elem = new Element({
  x: 20
})

var elem = new Element({
  transform: {
    x: 20
  }
})
