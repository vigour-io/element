require('./style.less')

var app = require('../../lib/app')
var Element = require('../../lib/element')

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
// {
//   pass:function( e, event ){
//     return Math.abs(event.dx) > Math.abs(event.dy)
//   }
// }
})

app.set({
  a: new thing.Constructor({
    text: '>>xx>'
  })
})

app.set({
  // draggable:{
  //   x:true
  // }
})

var elem = new Element({
  x: 20
})

var elem = new Element({
  transform: {
    x: 20
  }
})
