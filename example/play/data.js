'use strict'
var Observable = require('vigour-js/lib/observable')
var Data = new Observable({
  inject: require('../../lib/subscription/stamp'),
  Child: 'Constructor'
}).Constructor

module.exports = new Data({
  shows: {
    a: {
      title: 'a'
    }
  },
  discover: {
    new: {
      items: {
        a: { title: 'nest-a' } // make ref -- support this traight in vjs
      }
    }
  }
})
