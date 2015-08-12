"use strict";

var Element = require('../element')

Element.prototype.inject(
  require( '../../lib/property/attributes' )
)



var Input = new Element({
	$node:'input',
	$attributes:{
		type:'password'
	}
})

module.exports = Input.$Constructor