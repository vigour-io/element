var Element = require( '../../lib/element' )

describe( 'Create new element \'elem\'', function(){
	
	var elem

	it( 'var elem = new Element()',function(){
		elem = new Element()
	})

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

describe( 'Set key \'a\'', function(){
	
	var elem = new Element()

	it('elem.set({ $key:\'a\' })',function(){
		elem.set({$key:'a'})
	})

	it( 'elem now has key \'a\'', function () {
		expect(elem._$key).to.equal('a');
	})

	it( 'elem now has a path [\'a\']', function () {
		expect(elem.$path).to.deep.equal(['a']);
	})

	it( 'elem still has no context', function () {
		expect(elem._$context).to.not.be.ok;
	})

})

//add child
describe( 'Add child', function(){

	var elem = new Element({$key:'a'})

	it('elem.set({ elemChild:{} })',function(){
		elem.set({ elemChild:{} })
	})

	it( 'elem.elemChild is instance of Element', function () {
		expect(elem.elemChild instanceof Element).to.equal(true);
	})

	it( 'elem.elemChild has key \'elemChild\'', function () {
		expect(elem.elemChild._$key).to.equal('elemChild');
	})

	it( "elem.elemChild has path ['a','elemChild']", function () {
		expect(elem.elemChild.$path).to.deep.equal(['a','elemChild']);
	})

	it( 'elem.elemChild has no context', function () {
		expect(elem.elemChild._$context).to.not.be.ok;
	})

})