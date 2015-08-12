"use strict";

var Element = require('../element')

Element.prototype.inject(
  require( '../../lib/property/attributes' )

)



var Input = new Element({
	$inject:require( '../events' ),
	$node: 'input',
	$attributes: {
		type:'password'		
	},
	$on:{
		$down:function ( event ) {
			this.$emit('$focus', event)
		}
	}
})

module.exports = Input.$Constructor