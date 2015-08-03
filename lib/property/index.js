"use strict";

var Observable = require('vjs/lib/observable')
var set = Observable.prototype.set

module.exports = new Observable({
  $inject:[
    require('vjs/lib/operator/transform'),
    require('vjs/lib/operator/add'),
    require('vjs/lib/operator/prepend'),
    require('../cases/inject')
  ],
  $define:{
  	set:function( val, event, nocontext ){
  		return set.call(this, val, event || void 0, nocontext )
  	}
  }
}).$Constructor
