'use strict'
var cases = require('vigour-element/lib/cases')
var Element = require('../../lib')

cases.set({
  $testCase: true
})

var app = global.app = new Element({
  DOM: document.body,
  button: {
    html: {
      val: 'notCase!!',
      $testCase: 'HAHAHAH SUCCESS'
    },
    on: {
      down (e, event) {
        cases.$testCase.val = !cases.$testCase.val
      }
    }
  }
})