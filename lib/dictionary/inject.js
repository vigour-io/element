"use strict";

var dictionary = require('./')
var Operator = require('vjs/lib/operator')
var set = Operator.prototype.set

exports.$inject = require('vjs/lib/operator/shared')

exports.$flags = {
  $dictionary: new Operator({
  	$define:{
  		set:function(val){
  			arguments[0] = dictionary.get(val,val)
  			set.apply(this,arguments)
  		}
  	},
    $key:'$dictionary',
    $operator:function( val, operator, origin ) {
      return operator.$val
    }
  })
}