'use strict'
var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')
var cases = require('../../lib/cases')
var app = require('../../lib/app')

cases.set({
  $test: true,
  $test2: true
})

app.set({
  // thing: {
  //   text: {
  //     val: 'NO case',
  //     $test: 'YES case!'
  //   }
  // },
  thing2: {
    text: {
      val: '22 NO case',
      $test: {
        val: 'hihihi'
      },
      $test2: ' 22 YES case!'
    }
  }
})

// cases.$test.emit('data')

// setTimeout(function () {
//   console.log('------1')
//   cases.$test.val = false
//   setTimeout(function () {
//     console.log('------2')
//     cases.$test.val = true
//     cases.$test2.val = true
//   }, 1000)
// }, 1000)

global.cases = cases

// var obs = new Observable({
//   on:{
//     data () {
//       console.log('fires!', this.val)
//     }
//   }
// })
// var ref = global.ref = new Observable(true)


// obs.set(ref)