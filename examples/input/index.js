require('./style.less')
var Element = require( '../../lib/element' )
var Input = require( '../../lib/input' )
var app = require( '../../lib/app' )

Element.prototype.inject(require('vjs/lib/operator/transform'))

var input = new Input({
	$attributes : {
		type :'text',
		maxlength : 10
	},
	
	$on:{
		$keyup: function ( argument ) {
			console.log("uppp")
		},
		blur:function() {
			this.$val = this.$node.value
		},
		$validation: function ( event, meta ) {
			console.log(meta)
		}
	},
	$required:{
		required: true,
		message: "This is a custom message for required fields",
		defaultStyle : true //otherWise you can pass the css or meybe a function ? WIP
	},
})

// var passwordInput = new Input({
// 	$val:"renan",
// 	$attributes:{
// 		type:"password"
// 	}
// })

var element = new Element({
	fields : {
		name: new input.$Constructor,
		surname : new input.$Constructor,
		// pass:{
		// 	password:passwordInput
		// },
		submit : new Input({
			$attributes : {
				type:"submit",
				value:"Save"
			},
			$on:{
				click:function (argument) {
				}
			}
		})
	}
})

app.set({
	form:{
		$node:"form",
		form:element
	}
})

console.log(input.$flags.$rules)