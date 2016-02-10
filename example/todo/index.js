'use strict'
var e = require('../../e')

e([
  require('./todos'),
  { DOM: document.body }
]).set(require('./data'))
