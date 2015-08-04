var Element = require( '../../lib/element' )

describe( 'Element', function () {
	var elem = new Element()
	var elemInstance
	//create element
	describe( 'var elem = new Element() //create new element', function(){
		it( 'elem is instance of Element', function () {
			expect(elem).to.be.instanceOf(Element);
		})
		
		it( 'elem has no key by default', function () {
			expect(elem._$key).to.equal(void 0);
		})

		it( 'elem has no path', function () {
			expect(elem.$path.length).to.equal(0);
		})

		it( 'elem has no context', function () {
			expect(elem._$context).to.not.be.ok;
		})
	})

	//set key
	describe( 'elem.set({ $key:\'elemKey\' }) //set key', function(){

		it( 'elem now has key \'elemKey\'', function () {
			elem.set({$key:'elemKey'})
			expect(elem._$key).to.equal('elemKey');
		})

		it( 'elem now has a path [\'elemKey\']', function () {
			expect(elem.$path).to.deep.equal(['elemKey']);
		})

		it( 'elem still has no context', function () {
			expect(elem._$context).to.not.be.ok;
		})

	})

	//add child
	describe( 'elem.set({ elemChild:{}, elemChild2:{} }) //add children', function(){

		it( 'elem.elemChild is instance of Element', function () {
			elem.set({ elemChild:{}, elemChild2:{} })
			expect(elem.elemChild instanceof Element).to.equal(true);
		})

		it( 'elem.elemChild has key \'elemChild\'', function () {
			expect(elem.elemChild._$key).to.equal('elemChild');
		})

		it( "elem.elemChild has path ['elemKey','elemChild']", function () {
			expect(elem.elemChild.$path).to.deep.equal(['elemKey','elemChild']);
		})

		it( 'elem.elemChild has no context', function () {
			expect(elem.elemChild._$context).to.not.be.ok;
		})

	})

	//create instance of elem
	describe( 'var elemInstance = new elem.$Constructor() //create instance', function(){
		elemInstance = new elem.$Constructor()

		it( 'elemInstance is instance of elem._$Constructor', function () {
			expect(elemInstance).to.be.instanceOf(elem._$Constructor);
		})

		it( 'elemInstance.elemChild is instance of elem.elemChild._$Constructor', function () {
			expect(elemInstance.elemChild).to.be.instanceOf(elem.elemChild._$Constructor);
		})

		it( 'elemInstance has the same key as elem: \'elemKey\'', function () {
			expect(elem._$key).to.equal(elemInstance._$key).to.equal('elemKey');
		})

		it( 'elemInstance has no context', function () {
			expect(elemInstance._$context).to.not.be.ok;
		})

		it( 'elemInstance.elemChild has context elemInstance', function () {
			expect(elemInstance.elemChild._$context).to.equal(elemInstance);
		})

		it( 'elem.elemChild still has no context', function () {
			expect(elem.elemChild._$context).to.not.be.ok;
		})
	})

	//set key
	describe( 'elemInstance.set({ $key:\'elemInstanceKey\' }) //change instance key', function(){

		it( 'elemInstance now has key \'elemInstanceKey\'', function () {
			elemInstance.set({$key:'elemInstanceKey'})
			expect(elemInstance._$key).to.equal('elemInstanceKey');
		})

		it( 'elemInstance now has a path [\'elemInstanceKey\']', function () {
			expect(elemInstance.$path).to.deep.equal(['elemInstanceKey']);
		})

	})

	//add child to elemInstance
	describe( 'elemInstance.set({ elemInstanceChild:{} }) //add child to instance', function(){
		it( 'elem does not have child elemInstanceChild', function () {
			elemInstance.set({ elemInstanceChild:{} })
			expect(elem.elemInstanceChild).to.not.be.ok
		})

		it( 'elemInstance.elemInstanceChild is instance of Element', function () {
			expect(elemInstance.elemInstanceChild).to.be.instanceOf(Element);
		})

		it( 'elemInstance.elemInstanceChild has path [\'elemInstanceKey\',\'elemInstanceChild\']', function () {
			expect(elemInstance.elemInstanceChild.$path).to.deep.equal(['elemInstanceKey','elemInstanceChild']);
		})

	})

	//remove child from original
	describe( 'elem.elemChild.remove() //remove child from original', function(){
		
		it( 'elem.elemChild is removed', function () {
			elem.elemChild.remove()
			expect(elem.elemChild).to.not.be.ok
		})

		it( 'elemInstance.elemChild also is removed', function () {
			expect(elemInstance.elemChild).to.not.be.ok
		})

	})

	//remove child from instance
	describe( 'elemInstance.elemChild2.remove() //remove child from instance', function(){
		
		it( 'elemInstance.elemChild2 is removed', function () {
			elemInstance.elemChild2.remove()
			expect(elemInstance.elemChild2).to.not.be.ok
		})

		it( 'elem.elemChild2 is not removed', function () {
			expect(elem.elemChild2).to.be.ok
		})

	})

	describe( 'changes should be happen in the correct element',function(){

		elemInstance.set({
			$on:{
				$change:function(){
				}
			}
		})

		it( 'changes in elemInstance should NOT change elem',function () {
			var spy = sinon.spy(elem.$on.change)
			elemInstance.$val = "new"
			expect(spy.calledOnce).to.not.be.true
		})

		it( 'elem should keep the same val',function () {
			expect(elem.$val).to.not.be.equal("new")
		})
		it( 'change elem $val should not update elemInstance $val', function(){
			elem.$val="Another value"
			expect(elemInstance.$val).to.be.equal("new")
			expect(elem.$val).to.be.equal("Another value")
		})

	})

})