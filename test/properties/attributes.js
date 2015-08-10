var Element = require('../../lib/element')

Element.prototype.inject(
  require('../../lib/property/attributes') 
)



describe( '--> Attributes' , function () {
	var a = new Element({})
	a.set({
		$attributes: {
	    custom: true
	  },
	})

	afterEach(function () {
		a.$attributes.set({
			custom: true
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
		var b = new a.$Constructor()

		it( '\'b\' should have the same attributes of \'a\'' , function () {
			expect(b.$node.getAttribute('custom')).to.be.equals("true")
		})

		it( '\'a\' changes should change \'b\' too' , function () {
			a.$attributes.custom.set({
				$val :"newValue"
			})
			// Should update as well, no youri?
			// the weird thing is that b.$attributes.custom.$val === "newValue"
			expect(b.$node.getAttribute('custom')).to.be.equals("newValue")
		})

		it( '\'b\' changes should not change \'a\'' , function () {
			b.$attributes.set({
				custom :"bValue"
			})
			expect(a.$node.getAttribute('custom')).to.be.equals("true")
		})

		it( 'remove custom attributes from \'b\'' , function () {
			b.$attributes.custom.remove()
			expect(b.$node.getAttribute('custom')).to.be.null
		})

		it( 'attributes should be defined' , function () {
			expect(b.$attributes).to.be.ok
		})


		it( 'attributes should be defined' , function () {
			expect(b.$attributes).to.be.ok
		})

		it( 'remove \'a\' custom attribute should remove \'b\' too' , function () {
			a.$attributes.custom.remove()
			expect(b.$attributes.custom).to.be.null
		})


	})

})