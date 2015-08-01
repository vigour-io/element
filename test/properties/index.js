var Element 		= require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/size' ),
  require( '../../lib/property/attributes' ),
  require( '../../lib/property/backgroundcolor' ),
  require( '../../lib/property/text' ),
  require( 'vjs/lib/methods/lookUp' )
)

var a = new Element({
	$backgroundcolor: 'red',
	$text: 'simple text', 
	$css: 'test',
	$width: 100,
	$height: 100,
	$attributes: {
		draggable:true
	}
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
		expect(a.$node.textContent).to.be.equal("simple text")
		done()
	})

	it( 'Shold be able to change the width and the heigh of an element', function (done) {
		expect(a.$node.style.width).to.be.equal("100px")	
		expect(a.$node.style.height).to.be.equal("100px")	
		done()
	})
	it( 'Shold be able to any attributes to an element', function (done) {
		expect(a.$node.draggable).to.be.equal(true)	
		done()
	})
})