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
	app.set({inputField:a})

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


describe( '--> Input with required true' , function(){

  var a = new Input({
    $attributes:{
      type:"text"
    },
    $required:{
      required: true,
      message: "This is a custom message for required fields",
      defaultStyle : true
    },
    $on:{
      $validation:function( event, meta ) {
        txt = ""
        txt = meta
      }
    }
  })
  app.set({inputRequired:a})

  it( 'should use the default error behaviour when the the input is empty' ,function () {
    a.$node.value = ""
    fireEvent( a.$node, 'blur')
    expect(a.$node.style.borderColor).to.be.equal('red')
  })

  it( 'should be fine if the input is not empty' ,function () {
    a.$node.value = "some text"
    fireEvent( a.$node, 'blur')
    expect(a.$node.style.borderColor).to.not.be.equal('red')
  })

  it( 'should use the custom message' ,function () {
    a.$node.value = "some text"
    fireEvent( a.$node, 'blur')
    expect(txt).to.be.equal('This is a custom message for required fields')
  })

})








