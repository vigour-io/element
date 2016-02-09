'use strict'
var e = require('../../e')

var app = e([
  require('./todos'),
  { DOM: document.body }
])

global.app = app

app.set(require('./data'))

// use globals/document or something for document.body more portable
console.log(app)
