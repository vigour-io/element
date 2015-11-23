require('vigour-scratch/lib/mixins.less')
require('./style.less')

var Element = require('../../lib/element')

var App = require('../../lib/app')
var app = new App({
  node: document.body
})


Element.prototype.inject(
  require('../../lib/property/scroll/top'),
  require('../../lib/property/background')
)

var coke = new Element({
  background: {
    inject: require('../../lib/property/background/position')
  },
  label: {}
})

app.set({
  node:document.body,
  coke: coke,
  scrollTop: {
    on: {
      data (ev, event) {
        coke.background.setKey('x', ~~(this.val / 2))
      }
    }
  }
})
