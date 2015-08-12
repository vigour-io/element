var Element = require( '../../lib/element' )
var Input = require( '../../lib/input' )

var app = require( '../../lib/app' )



var element = new Element({
	textBox: new Input({
		$val:"renan",
		$attributes:{
			type:'text'
		}
	})
})


app.set({
	ba:element
})

console.log(element.textBox)