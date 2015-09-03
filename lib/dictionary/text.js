"use strict";

var TextProperty = require('../property/text').$flags.$text
var set = TextProperty.prototype.set
var dictionary = require('./')

exports.$flags = {
	$text:new TextProperty({
		$define:{
			set:function( val ){
				arguments[0] = dictionary.get(val,val)
				return set.apply(this, arguments)
			}
		}
	})
}