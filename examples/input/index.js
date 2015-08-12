require('./style.less')
var Element = require( '../../lib/element' )
var Input = require( '../../lib/input' )
var app = require( '../../lib/app' )

var input = new Input({
	$attributes: {
		type:'text'
	},
	$on:{
		focusin: function ( event ) {
			console.log( "focusIn", event)
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
	form:element
})


input.$val = "renan"
console.log(input.$val)