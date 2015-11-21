// original idea came from
// http://www.romancortes.com/ficheros/css-coke.html

require('vigour-scratch/lib/mixins.less')
require('./style.less')

var app = require('../../lib/app')
// var app = module.exports = new App()

var Element = require('../../lib/element')

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
  coke: coke,
  scrollTop: {
    on: {
      data: function (ev, event) {
        coke.background.setKey('x', ~~(this.val / 2))
      }
    }
  }
})
