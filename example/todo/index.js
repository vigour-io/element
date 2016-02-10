'use strict'
var e = require('../../e')

var app = e([
  require('./todos'),
  { DOM: document.body }
])

app.set(require('./data'))
