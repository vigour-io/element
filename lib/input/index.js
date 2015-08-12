"use strict";

var Element = require('../element')

Element.prototype.inject(
  require( '../../lib/property/attributes' )

)

// var Input = new Element({
// 	$val:1,
// 	$transform: function(element){
// 		console.log(element.$node)
// 		if (element.$val !== "" && this.$required === true) {
// 			// element.$node.borderColor = "red"
// 		}
// 		else{
// 			// element.$node.borderColor = "white"
// 		}
// 	},
// 	$inject:require( '../events' ),
// 	$node: 'input',
// 	$attributes: {
// 		type:'password'		
// 	},
// 	$flags:{
// 		$required:false
// 	}
// })

var Input = new Element({
	$node: 'input',
	$attributes: {
		type:'password'		
	},
	
})

module.exports = Input.$Constructor