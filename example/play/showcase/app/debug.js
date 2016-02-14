'use strict'

var Observable = require('vigour-js/lib/observable')
var e = require('../../../../e')

var data = require('../data')

var cases = require('../../../../lib/cases')

// cases.set({
//   $james: false
// })

window.cases = cases

// var somethingelse = e({
//   text: 'bla',
//   inject: {
//     properties: {
//       xx: Observable
//     },
//     gurkens: {
//       text: ' ---> hello'
//     }
//   }
// })

var components = {}

components.xx = {
  text: { val: 'xxxxx', $james: ' dssdsdsd'}
}

components.ax = {
  text: 'ax --- xxxxxxx'
}

components.aa = {
  $collection: 'channels',
  Child: {
    item: { type: 'xx' }
  }
}

components.ab = {
  type: 'aa',
  $collection: 'shows',
  Child: {
    // item: { type: 'ax' }  -- first cases
  }
}

// can also add order to props maybe
var app = e({ //eslint-disable-line
  components: components,
  DOM: document.body
})

app.set({
  // aa: { type: 'aa' },
  line: { text: { val: '--------------', ames: 'xxxxx' }, on: { click () {} } },
  // ab: { type: 'ab' }
})

// app.val = data

console.log(data)

console.log('---------------------------------------------')
// cases.$james.val = true