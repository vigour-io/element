"use strict";
var Property = require('../')
var isLikeNumber = require('vjs/lib/util').isLikeNumber

exports.Parameter = new Property({
  $flags: {
    $property: function(val) {
      this.$property = val
    }
  },
  $on: {
    $change: function( event, removed ) {
      var val = this.$val
      var property  = this.$property
      if(!this.$parent[property]) {
        this.$parent.setKey( property, false )
      }
      var node = this.lookUp( '$node' )
      this.$parent[property].emit( '$change', event )
    }
  }
}).$Constructor

exports.parseParameters = function( x, y, xDefault, yDefault ) {
  var val
  var parent = this.$parent
  if( parent[x] || parent[y] ) {
    x = parent[x] && parent[x].$val || xDefault || 0
    y = parent[y] && parent[y].$val || yDefault || 0
    if(isLikeNumber(x)) {
      x = x+'px'
    }
    if(isLikeNumber(y)) {
      y = y+'px'
    }
    val = x+' '+y
    return val
  } else {
    return this.$val
  }
}
