require('./style.less')

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
  tit: {
    text: {
      $: 'title'
    }
  },
  des: {
    text: {
      $: 'description'
    }
  }
}).Constructor

var obj = require('./content.json')

var List = new Element({
  ChildConstructor: Item,
  $: 'content.shows'
}).Constructor

var data = new Observable({
  content:obj
})

var app = new App({
  // properties: {
  //   content: new Observable()
  // },
  node: document.body,
  // content:obj,
  val:data,
  list: new List(),
  list2: new List()
})

function count (obs, cnt, remove) {
  if (!obs) return
  cnt = cnt || 0
  if (cnt === remove) {
    obs.remove()
  } else {
    obs.each(function (property) {
      cnt = count(property, cnt, remove)
      if (!cnt) return true
    })
    return cnt + 1
  }
}

// app.list.remove()
// removing random item every now and then
setInterval(function () {
  var randomItem = ~~(Math.random() * count(data.content))
  count(data.content, 0, randomItem)
}, 1)

// setting all data again
setInterval(function () {
  data.set({
    content: JSON.parse(JSON.stringify(obj))
  })
}, 10)

// // removing the list and making a new instance
// setInterval(function () {
//   app.list.remove()
//   setTimeout(function () {
//     app.set({
//       list: new List()
//     })
//   }, 10)
// }, 100)

// // removing the list and making a new instance
// setInterval(function () {
//   app.list2.remove()
//   setTimeout(function () {
//     app.set({
//       list2: new List()
//     })
//   }, 20)
// }, 90)