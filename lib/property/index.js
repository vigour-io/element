"use strict";

var Observable = require('vjs/lib/observable')

module.exports = new Observable({
  $inject:[
    require('vjs/lib/operator/transform'),
    require('vjs/lib/operator/add'),
    require('vjs/lib/operator/prepend')
  ]
}).$Constructor