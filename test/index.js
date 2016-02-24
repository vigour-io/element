'use strict'

var e = require('../e')
var fakeDom = {}
var test = require('tape')

// do this with a conditional require or something
var app = e({
  bla: {
    text: 'geinig!',
    gurk: {
      text: 'bla'
    }
  },
  DOM: fakeDom
})

var str = toHTML(app.renderTree)

console.log(str)
