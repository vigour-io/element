'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

// --------------real-----------
var obs = global.obs = new Observable({})
// setTimeout(function () {
  console.log('go go go go go shit!')
  for (var i = 1; i < 30; i++) {
    obs.set({[i] : {
      text: 'text: ' + i,
      nested: 'nest: ' + i,
      shows: {
        1: {
          img: 'http://dummyimage.com/' + (i * 20) + 'x' + (i * 20) + '/089c90'
          // ballz: 'ballz' + i
        },
        2: {
          ballz: '2ballz' + i
        }
      }
    }})
  }
// }, 1000)

// obs[0].on(function (data) {
//   console.log('hello', data)
// })

// Element.prototype.inject(require('./collection'))

var Img = new Element({
  type: 'img',
  src: {
    $: 'img'
  }
}).Constructor

var bla = new Element({
  $collection: true,
  ChildConstructor: new Element({
    text: { $: 'text' },
    nestedthing: {
      text: { $: 'nested' } // add this to one listener
    },
    colleciton1: {
      // text: function () {
      //   return this.parent.key
      // },
      nest1: {
        $: 'shows',
        collection2: {
          $collection: true,
          ChildConstructor: new Element({
            text: { $: 'ballz' },
            smus: new Img()
          })
        }
      }
    }
  })
})

// app.set({
//   xx: bla
// })
console.time(1)

bla.val = obs

console.timeEnd(1)

console.time(1)
app.set({ bla: bla })
console.timeEnd(1)

module.exports = app
