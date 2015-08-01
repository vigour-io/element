var Element 		= require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/backgroundcolor' ),
  require( '../../lib/property/text' ),
  require( 'vjs/lib/methods/lookUp' )
)

var a = new Element({
	$backgroundcolor: 'red',
	$test: 'simple text', 
	$css: 'test'
	
})


describe( 'Properties' ,function () {
	it( 'Should be able to set background-color on a element', function (done) {
		expect(a.$node.style.backgroundColor).to.be.equal("red")
		done()
	})

	it( 'Should be able to set a css class on a element', function (done) {
		expect(a.$node.className).to.be.equal("test")
		done()
	})

	it( 'Should be able to set a custom text on a element', function (done) {
		expect(a.$node).to.be.equal("simple text")
		done()
	})

})