require('./style.less')

var Event = require('vigour-js/lib/event')
var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')
var App = require('../../lib/app')

Observable.prototype.inject(
  require('../../lib/animation'),
  require('vigour-js/lib/operator/subscribe'),
  require('vigour-js/lib/operator/transform'),
  require('vigour-js/lib/operator/add')
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
    $: '../',
    $add: 'smur'
  },
  // foo: {
  //   text: {
  //     $: '../../'
  //   }
  // },
  // bar: {
  //   text: {
  //     $: '../../'
  //   }
  // }
}).Constructor

var obj = {}

var List = new Element({
  ChildConstructor: Item,
  $: 'content'
}).Constructor

var data = new Observable({
  content: {
    // on: {
    //   data: {
    //     test () {
    //       console.log('data')
    //     }
    //   },
    //   property () {
    //     console.log('property')
    //   }
    // }
  }
})

console.time('content set')
var event = new Event(data.content, 'data')
event.isTriggered = true

var app = new App({
  node: document.body,
  val: data,
  list: new List()
}, event)


for (var i = 1; i > 0; i--) {
  data.content.set({[i]: 'test'+i }, event)
}
console.log('trigger!')
event.trigger()
console.timeEnd('content set')
