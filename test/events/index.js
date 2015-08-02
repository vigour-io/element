var Element 		= require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( 'vjs/lib/methods/lookUp' )
)

var a = new Element( {
	$on:{
		$click:function (argument) {
			this.$val = "clicked"
		},
		$grab:function (argument) {
			this.$val = "grabbed"
		}
	}
} )

describe( 'Events', function ( done ) {
	it( 'Click event available inside an element', function ( done ) {
		a.$emit("$click")
		expect(a.$val).to.be.equal("clicked")
		done()
	})

	it( 'Grab event available inside an element', function ( done ) {
		a.$emit("$grab")
		expect(a.$val).to.be.equal("grabbed")
		done()
	})

	it( 'Override an event', function( done ) { 
		a.set({
			$on:{
				$click:function () {
					this.$val = "overridden click"
				}
			}
		})
		a.$emit("$click")
		expect(a.$val).to.be.equal("overridden click")
		done()
	})

})