"use strict";

var Element = require('../element')

Element.prototype.inject(
  require( '../../lib/property/attributes' )
)
var Input = new Element({
	$node: 'input',
	$attributes: {
		type:'text'
	},
	$on:{
		$change:function (argument) {
			console.log("changed")
		}
	},
	$flags:{
		$required:function( val, event ) {
			this.on('blur', function ( event, e ) {
				var inputValue = this.$node.value
				if(inputValue === "" && val.required === true) {
					var message = val.message !== void 0 ? val.message : "Required field"
					this.$emit( "$validation", void 0, message )
				}
				if (val.defaultStyle && inputValue === "") {
					this.$node.style.border = "solid 1px red"
				}
				else{
					this.$node.style.border = "solid 1px #D9D9D9" //default
				}
			})
		}
	}
})

module.exports = Input.$Constructor
