require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')

var App = require('../../lib/app')
var app = new App({
  node: document.body
})

// create data
var data = new Observable()

for (var i = 100; i >= 0; i--) {
  data.setKey(i, {
    one: i + '-one',
    two: i + '-two',
    three: i + '-three',
    four: i + '-four'
  })
}

// subscribed element
var Elem = new Element({
  textOne: {
    text: {
      $: '../../one'
    }
  },
  textTwo: {
    text: {
      $: '../../two'
    }
  },
  textThree: {
    text: {
      $: '../../three'
    }
  },
  textFour: {
    text: {
      $: '../../four'
    }
  }
}).Constructor

// collection holder
var collection = new Element({
  ChildConstructor: Elem,
  $:'data'
  // $origin: data
})

console.time('add to app')
// add to app
app.set({
  data: data,
  c: collection
})
console.timeEnd('add to app')
console.time('create cache')
var cache = app.c.parseValue()
console.timeEnd('create cache')


var Event = require('vigour-js/lib/event')
var event = new Event(app.c._cache)
event.isTriggered = true

// console.time('populate')

// app.c._cache.each(function (prop, key) {
//   prop.set({
//     textOne: {
//       text: {
//         $origin: data[key].one
//       }
//     },
//     textTwo: {
//       text: {
//         $origin: data[key].two
//       }
//     },
//     textThree: {
//       text: {
//         $origin: data[key].three
//       }
//     },
//     textFour: {
//       text: {
//         $origin: data[key].four
//       }
//     }
//   }, event)
// })

// event.trigger()

// console.timeEnd('populate')

// console.time('remove')
// collection.remove()
// console.timeEnd('remove')

