'use strict'
var Observable = require('vigour-js/lib/observable')
var Data = new Observable({
  inject: require('../../../lib/subscription/stamp'),
  properties: {
    video: {
      $transform: '3099'
    }
  },
  Child: 'Constructor'
}).Constructor

/*
  video: {
    val: '3099'
  },
*/

// module.exports.set

module.exports = new Data(require('./raw.js'), false)
