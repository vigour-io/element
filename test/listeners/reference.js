describe( 'On $reference',function(){

	var Element = require( '../../lib/element' )
	var elem = new Element()
	var referenceCount = 0

	//add reference listener to original
	describe('Add $reference listener',function(){
		
		before(function(){
			referenceCount = 0
		})

		it('elem.$on.set({ $reference:function(){ referenceCount++ } })',function(){
			elem.$on.set({
				$reference:function(){
					referenceCount++
				}
			})
		})

		it( 'elem now has a $reference listener', function () {
			expect(elem.$on.$reference).to.be.ok
		})

		it( 'referenceCount is zero', function () {
			expect(referenceCount).to.be.zero
		})
	})

	//reference value of element
	describe('Set value',function(){
		before(function(){
			referenceCount = 0
		})

		it('elem.$val = 1',function(){
			elem.$val = 1
		})

		it( 'reference did not fire, referenceCount is 0', function () {
			expect(referenceCount).to.equal(0)
		})
	})

	//set key
	describe('Set key ',function(){
		before(function(){
			referenceCount = 0
		})

		it('elem.set({$key:\'a\'})',function(){
			elem.set({$key:'a'})
		})

		it( 'reference did not fire, referenceCount is 0', function () {
			expect(referenceCount).to.equal(0)
		})
	})

	//add to parent
	describe('Add elem to parent',function(){
		before(function(){
			referenceCount = 0
		})

		it('var parent = new Element({ elem:elem })',function(){
			var parent = new Element({ elem:elem })
		})

		it( 'reference did not fire, referenceCount is 0', function () {
			expect(referenceCount).to.equal(0)
		})
	})

	//set reference
	describe('Set reference',function(){
		before(function(){
			referenceCount = 0
		})

		it('var ref = new Element(); elem.$val = ref',function(){
			var ref = new Element()
			elem.$val = ref
		})

		it( 'reference fires, referenceCount is 1', function () {
			expect(referenceCount).to.equal(1)
		})
	})

	//set child
	describe('Add child',function(){
		before(function(){
			referenceCount = 0
		})

		it('elem.set({child:{}})',function(){
			elem.set({child:{}})
		})

		it( 'reference did not fire, referenceCount is 0', function () {
			expect(referenceCount).to.equal(0)
		})
	})

	//set child on child
	describe('Add nested child',function(){
		before(function(){
			referenceCount = 0
		})

		it('elem.child.set({child:{}})',function(){
			elem.child.set({child:{}})
		})

		it( 'reference did not fire, referenceCount is 0', function () {
			expect(referenceCount).to.equal(0)
		})
	})

	//remove nested child
	describe('Remove nested child',function(){
		before(function(){
			referenceCount = 0
		})

		it('elem.child.child.remove()',function(){
			elem.child.child.remove()
		})

		it( 'reference did not fire, referenceCount is 0', function () {
			expect(referenceCount).to.equal(0)
		})
	})

	//remove child
	describe('Remove child',function(){
		before(function(){
			referenceCount = 0
		})
		
		it('elem.child.remove()',function(){
			elem.child.remove()
		})

		it( 'reference did not fire, referenceCount is 0', function () {
			expect(referenceCount).to.equal(0)
		})
	})

})