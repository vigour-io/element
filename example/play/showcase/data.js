'use strict'
var Observable = require('vigour-js/lib/observable')
var Data = new Observable({
  inject: require('../../../lib/subscription/stamp'),
  properties: {
    video: {
      $transform: 'https://s3-eu-west-1.amazonaws.com/sbsvigour/output/111700_794541d68c8c4fbe47407aaaaa70ceef/{type}s/111700.{type}'
    }
  },
  Child: 'Constructor'
}).Constructor

/*
  video: {
    val: 'https://s3-eu-west-1.amazonaws.com/sbsvigour/output/111700_794541d68c8c4fbe47407aaaaa70ceef/{type}s/111700.{type}'
  },
*/

// module.exports.set

module.exports = new Data(require('./raw'), false)
