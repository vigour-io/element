"use strict";

var Operator = require( 'vjs/lib/operator' )
var TextProperty = require('../property/text').$flags.$text
var set = TextProperty.prototype.set
var Observable = require('vjs/lib/observable')

window.dictionary = new Observable({
	$inject:require('vjs/lib/methods/get'),
	translation:{
		test:'test!'
	}
})

exports.$flags = {
	$text:new TextProperty({
		$define:{
			set:function( val ){
				arguments[0] = dictionary.get(val,val)
				set.apply(this,arguments)
			}
		}
		// $flags:{
		// 	$dictionary: new Operator({		
		// 	  $key:'$dictionary',
		// 	  $operator:function( val, operator, origin ) {
		// 	  	var translation = dictionary.get(val,val)
		// 	    return translation ? translation._$val : ' nooo '
		// 	  }
		// 	})
		// },
		// $dictionary:window.dictionary
	})
}