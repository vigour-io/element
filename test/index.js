var app 				= require( '../lib/app' )
var Element 		= require( '../lib/element' )
var Events 			= require( '../lib/events' )
var sinon 			= require('sinon')

Element.prototype.inject(
  require( '../lib/property/css' ),
  require( '../lib/property/text' ),
  require( 'vjs/lib/methods/lookUp' )
)

var a = new Element( {
	$on:{
		$click:function (argument) {
			this.$val = "clicked"
		},
		$grab:function (argument) {
			this.$val = "grabed"
		}
	}
} )


var spy = sinon.spy()
a.on('$click', spy)
a.on('$grab', spy)

describe( 'Events', function ( done ) {
	it( 'Should have the click event available inside an element', function ( done ) {
		a.$emit("$click")
		expect(a.$val).to.be.equal("clicked")
		sinon.assert.called(spy)
		done()
	})

	it( 'Should have the grab event available inside an element', function ( done ) {
		a.$emit("$grab")
		expect(a.$val).to.be.equal("grabed")
		sinon.assert.called(spy)
		done()
	})

	it( 'Should be able to override an event', function( done ) { 
		a.set({
			$on:{
				$click:function () {
					this.$val = "overrided click"
				}
			}
		})
		a.$emit("$click")
		expect(a.$val).to.be.equal("overrided click")
		sinon.assert.called(spy)
		done()
	})


	
})