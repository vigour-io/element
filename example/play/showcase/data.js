'use strict'
var Observable = require('vigour-js/lib/observable')
var Data = new Observable({
  inject: require('../../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor

module.exports = new Data(require('./raw.js'), false)
