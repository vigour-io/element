// original idea came from
// http://www.romancortes.com/ficheros/css-coke.html
require('./style.less')

var app = window.app1 = require('../../lib/app')
var Element = require('../../lib/element')

Element.prototype.inject(
  require('../../lib/property/scroll/top'),
  require('../../lib/property/background')
)

var coke = new Element({
  background: {
    inject: require('../../lib/property/background/position'),
  },
  label: {}
})

app.set({
  coke: coke,
  scrollTop: {
    on: {
      change: function (ev, event) {
        coke.background.setKey('x', ~~(this.val / 2))
      }
    }
  }
})
