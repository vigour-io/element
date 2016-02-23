'use strict'

console.log('yo yo yo')

var e = require('../e')

var fakeDom = {}

// do this with a conditional require or something
var app = e({
  DOM: fakeDom
})

console.log('gurk', app.renderTree)