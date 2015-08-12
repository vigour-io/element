require('./style.less')
var Element = require( '../../lib/element' )
var Input = require( '../../lib/input' )
var app = require( '../../lib/app' )

Element.prototype.inject(require('vjs/lib/operator/transform'))

var input = new Input({
	$attributes: {
		type:'text'
	},
	$required:true,
	$on:{
		focus:function(){
			console.log('such a party')
		},
		blur:function(){
			console.log('such a party, with Blur')
		},
		$keyup:function (argument) {
			console.log("uppp")
		},
		$keydown:function (argument) {
			console.log("downnn")
		},
		$keypress:function (argument) {
			console.log("press")
		}
	}
})

var passwordInput = new Input({
	$val:"renan",
	$attributes:{
		type:"password"
	}
})

var element = new Element({
	fields : {
		name: new input.$Constructor,
		surname : new input.$Constructor,
		pass:{
			password:passwordInput
		},
		submit : new Input({
			$attributes : {
				type:"submit",
				value:"Save"
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