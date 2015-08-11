var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' )
)

describe( '--> CSS' , function () {

	var a 

	afterEach(function () {
		a	= new Element({
			$css:'vigourClass'
		})
	})

	it( 'Adding a css class on the Element' , function () {
		expect(a.$node.className).to.be.equals('vigourClass')
	})

	it( 'changing the css class' , function () {
		a.$css.$val  = 'newClass'
		expect(a.$node.className).to.be.equals('newClass')
	})

	it( 'add another css class on the same element' , function () {
		a.$css.addClass('newClass')
		expect(a.$node.className).to.be.equals('vigourClass newClass')
	})

	it( 'remove specific css class on the element' , function () {
		a.$css.addClass('newClass')
		a.$css.remove('vigourClass')
		expect(a.$node.className).to.be.equals('newClass')
	})

})