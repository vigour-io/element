'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

require('./style.less')

// --------------real-----------
var obs = global.obs = new Observable({})
for (var i = 0; i < 1; i++) {
  obs.setKey(i, {
    text: 'text: ' + i,
    nested: 'nest: ' + i,
    shows: {
      1: {
        ballz: 'ballz' + i
      },
      2: {
        ballz: '2ballz' + i
      }
    }
  })
}

// Element.prototype.inject(require('./collection'))

var bla = new Element({
  $collection: true,
  ChildConstructor: new Element({
    text: { $: 'text' },
    bla: {
      text: { $: 'nested' } // add this to one listener
    },
    collectionrandomballz: {
      text: function () {
        return this.parent.key
      },
      xxx: {
        $: 'shows',
        bla: {
          $collection: true,
          ChildConstructor: new Element({
            text: { $: 'ballz' }
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
