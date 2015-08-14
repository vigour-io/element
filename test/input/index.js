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


describe( '--> Applying Input validations' , function() {
  var input = new Input({
    $attributes : {
      maxlength : 10
    },
    $verify:true,
    $on:{
      $verified:function( event, meta ) {
        count++
        this.$node.style.border = meta.value ? '1px solid green' : '1px solid red'
      }
    }
  })
  app.set({validation:input})
  it( 'input should have the $verified property' , function () {
    expect(input.$verified).to.be.ok
  })

  it( '$verified should be called if the input.$val changes' , function () {
    input.$val = "test"
    fireEvent( input.$node, 'keyup')
    expect(count).to.be.equals(3)
  })
})








