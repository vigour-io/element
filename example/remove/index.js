require('./style.less')

var App = require('../../lib/app')
var Element = require('../../lib/element')

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/events/click')
)

var elem = new Element({
  text: 'SUCCESS',
  nested: {
    text: 'FAIL'
  }
})

var app = new App({
  node: document.body,
  child: new elem.Constructor()
})

console.log('----removing-----')
app.child.nested.remove()
