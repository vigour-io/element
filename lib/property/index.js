'use strict'
var Observable = require('vigour-js/lib/observable')
// var Base = require('vigour-js/lib/base')
module.exports = new Observable({
  // inject: [
  //   // require('../../lib/animation')
  //   // require('../../lib/cases/inject')
  // ],
  properties: {
    $: true,
    $collection: true,
    render (val) {
      // shouldnt this just get shit (data stuff)
      this.define({ render: val })
    }
  }
}).Constructor
