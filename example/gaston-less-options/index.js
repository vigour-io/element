require('./style.less')

var Element = require('../../lib/element')
var app = require('../../lib/app')

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/events/click')
)

app.set({
  container: {
    text: {
      val: 'Container height: calc(100% - 90px); Should not result in calc(10%),',
      $transform: function (val) {
        return val + ' which is +/-' + (window.innerHeight - 20) * 0.1 + 'px'
      }
    }
  }
})

window.requestAnimationFrame(function () {
  app.set({
    msg: {
      text: 'Container size is currently: ' + window.getComputedStyle(app.container.node, null).height
    }
  })
})
