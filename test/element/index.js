var Element = require( '../../lib/element' )

describe( 'Element', function () {
	var elem = new Element()
	//create element
	describe( 'var elem = new Element()', function(){
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
	describe( 'elem.set({ $key:\'elemKey\' })', function(){

		it( 'elem now has key \'elemKey\'', function () {
			elem.set({$key:'elemKey'})
			expect(elem._$key).to.equal('elemKey');
		})

		it( 'elem now has a path', function () {
			expect(elem.$path.length).to.equal(1);
		})

		it( 'elem still has no context', function () {
			expect(elem._$context).to.not.be.ok;
		})

	})

	//add child
	describe( 'elem.set({ elemChild:{} })', function(){

		it( 'elem.elemChild is instance of Element', function () {
			elem.set({ elemChild:{} })
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
	describe( 'var elemInstance = new elem.$Constructor()', function(){
		var elemInstance = new elem.$Constructor()

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



})