var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' )
)


var element
var childElement
describe( '--> CSS' , function () {
	beforeEach(function () {
		element	= new Element({
			$key : "elem",
			$css:'vigourClass'
		})
	})

	it( 'Adding a css class on the Element' , function () {
		expect(element.$node.className).to.be.equals('vigourClass')
	})

	it( 'changing the css class' , function () {
		element.$css.set({
			$val:'newClass'
		})
		expect(element.$node.className).to.be.equals('newClass')
	})

	it( 'add another css class on the same element' , function () {
		element.$css.set({
			$addClass:'newClass'
		})
		expect(element.$node.className).to.be.equals('vigourClass newClass ')
	})

	it( 'remove specific css class on the element' , function () {
		element.$css.set({
			$addClass:'newClass'
		})
		element.$css.set({
			$removeClass:'vigourClass'
		})
		expect(element.$node.className).to.be.equals('newClass')
	})
})

describe( 'Inheriting' , function () {
	beforeEach(function () {
		childElement = new element.$Constructor({})
	})
	it( 'childElement should have element class' , function () {
		expect(childElement.$node.className).to.be.equals('newClass')
	})

	//not supported yet
	// it( 'element changes should change childElement ' , function () {
	// 	element.$css.set({
	// 		$addClass:'active'
	// 	})
	// 	expect(childElement.$node.className).to.be.equals("newClass active")
	// })
})