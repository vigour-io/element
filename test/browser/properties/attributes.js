var Element = require('../../../lib/element')

Element.prototype.inject(
  require('../../../lib/property/attributes')
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
    a.$attributes.set({
			custom: true
		})
    expect(a.$node.getAttribute('custom')).to.equal('true')

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

		it( '\'b\' should have the same attributes of \'a\'' , function () {
			expect(b.$node.getAttribute('custom')).to.equal('true')
		})

		it( '\'a\' changes should change \'b\' too' , function () {
			a.$attributes.custom.set({
				$val :'newValue'
			})

      expect(a.$node.getAttribute('custom')).to.equal('newValue')
			expect(b.$node.getAttribute('custom')).to.equal('newValue')
		})

		it( '\'b\' changes should not change \'a\'' , function () {
      b.$attributes.set({
				custom :'bValue'
			})

      expect(a.$attributes.custom.$val).to.equal( true )
      expect(b.$attributes.custom.$val).to.equal('bValue')
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
