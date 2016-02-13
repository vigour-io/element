'use strict'

var Observable = require('vigour-js/lib/observable')
var e = require('../../../../e')

var somethingelse = e({
  text: 'bla',
  inject: {
    properties: {
      xx: Observable
    },
    gurkens: {
      text: ' ---> hello'
    }
  }
})

// can also add order to props maybe
var app = e({ //eslint-disable-line
  components: {
    bla: somethingelse
  },
  bla: {
    type: 'bla',
    lildifference: {
      text: 'x'
    }
  },
  DOM: document.body
})

