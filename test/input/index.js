var Element = require( '../../lib/element' )
var Input = require('../../lib/input')
var app = require( '../../lib/app' )
var fireEvent = require('../events/util').fireEvent

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/attributes' )
)

var count = 0
var txt = ''

describe( '--> Using the input component' , function () {

	var a = new Input({
		$attributes:{
			type:"text"
		},
		$on:{
			focus: function () {
				count++
			},
			blur: function () {
				count++
			},
			$keypress: function() {
				txt = "yep"
			}
		}
	})
	app.set({renan:a})

	it( 'creating a simple input type text' , function () {
		expect(a.$node.type).to.be.equals('text')
	})

	it( 'input should trigger focus when focused' , function () {
		fireEvent( a.$node, 'focus')
		expect(count).to.be.equals(1)
	})

	it( 'input should trigger blur when blur' , function () {
		fireEvent( a.$node, 'blur')
		expect(count).to.be.equals(2)
	})

	it( 'input should trigger keypress when a key is pressed' , function () {
		fireEvent( a.$node, 'keypress')
		expect(txt).to.be.equals("yep")
	})
})