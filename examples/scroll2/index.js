require('./style.less')

var Element = require('../../lib/element')
var Property = require('../../lib/property')

Property.prototype.inject(
  require('../../lib/animation'),
  require('vigour-js/lib/operator/subscribe')
)

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

var Block = new Element({
  on: {
    click: function () {
      this.set({
        text: Math.random()
      })

      this.parent.parent.scrollTop.set(Math.random() * 400)
    }
  }
}).Constructor

var List = new Element({
  ChildConstructor: Block,
  one: {},
  two: {},
  three: {},
  four: {},
  five: {}
}).Constructor

var holder = new Element({
  scrollTop: 0,
  list: new List()
})

app.set({
  holder: {
    scrollTop: 0,
    list: new List()
  }
// ,
// thing: {
//   y: -200,
//   text: {
//     $subscribe: 'parent.parent.holder.scrollTop'
//   }
// }
})

// console.log('??', app.scrollTop instanceof Property)
