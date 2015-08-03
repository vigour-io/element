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

console.error( a )

describe( 'Properties' ,function () {
	it( 'Set background-color on an element', function (done) {
		expect(a.$node.style.backgroundColor).to.be.equal("red")
		done()
	})

	it( 'Set a css class on an element', function (done) {
		expect(a.$node.className).to.be.equal("test")
		done()
	})

	it( 'Set a custom text on an element', function (done) {
		expect(a.$node.textContent).to.be.equal("simple text")
		done()
	})

	it( 'Change the width and the height of an element', function (done) {
		expect(a.$node.style.width).to.be.equal("100px")
		expect(a.$node.style.height).to.be.equal("100px")
		done()
	})
	it( 'Set any attributes on an element', function (done) {
		expect(a.$node.draggable).to.be.equal(true)
		done()
	})
})

console.log(a.$node)
