var Element = require('../../lib/element')

Element.prototype.inject(
  require('../../lib/property/attributes') 
)



describe( '--> Attributes' , function () {
	var a = new Element({})
	var b
	a.set({
		$attributes: {
	    custom: true
	  },
	})

	afterEach(function () {
		a.$attributes.custom.set({
			$val :true
		})
	})

	it( 'adding custom attributes to an element' , function () {
		expect(a.$node.getAttribute("custom")).to.be.equals("true")
	})

	it( 'changing attribute value' , function () {
		a.$attributes.custom.set({
			$val :"newValue"
		})
		expect(a.$node.getAttribute('custom')).to.be.equals("newValue")
	})

	describe( 'inheriting elements' , function () {
		before(function(){
			b = new a.$Constructor()
		})

		it( 'b should have the same attributes of a' , function () {
			expect(b.$node.getAttribute('custom')).to.be.equals("true")
		})

		it( 'a changes should change b' , function () {
			a.$attributes.custom.set({
				$val :"newValue"
			})
			// Should update as well, no ?
			expect(b.$node.getAttribute('custom')).to.be.equals("newValue")
		})

		it( 'b changes should not change a' , function () {
			b.$attributes.custom.set({
				$val :"bValue"
			})
			expect(a.$node.getAttribute('custom')).to.be.equals("true")
		})
	})

})