require('./style.less')

var Event = require('vigour-js/lib/event')
var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')
var App = require('../../lib/app')

Observable.prototype.inject(
  require('../../lib/animation'),
  require('vigour-js/lib/operator/subscribe'),
  require('vigour-js/lib/operator/transform')
)

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/events/click')
)

var Item = new Element({
  text: {
    $: '../test'
  }
}).Constructor

var obj = {}

var List = new Element({
  ChildConstructor: Item,
  $: 'content'
}).Constructor

var data = new Observable({
  content: {
    on: {
      data: {
        test () {
          console.log('data')
        }
      },
      property () {
        console.log('property')
      }
    }
  }
})

var app = new App({
  node: document.body,
  val: data,
  list: new List()
})

var event = new Event(data.content, 'data')
event.isTriggered = true
for (var i = 500; i > 0; i--) {
  data.content.set({[i]: {test:'test'+i}}, event)
}
event.trigger()