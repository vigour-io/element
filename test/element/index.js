var Element = require( '../../lib/element' )

// it('var $new = {a:0,b:0}')
// it('var $change = {a:0,b:0}')
// it('var $property = {a:0,b:0}')
// it('var $addToParent = {a:0,b:0}')

// // var elem
// var elemInstance
// var a = {}
// var b = {}

// var $new = {a:0,b:0}
// var $change = {a:0,b:0}
// var $property = {a:0,b:0}
// var $addToParent = {a:0,b:0}

describe( 'Creating basic Element', function(){

	var elem

	describe( 'Create new element \'elem\'', function(){
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

})

//create instance of elem
describe( 'Creating instances of Elements', function(){

	var elem = new Element({$key:'a',elemChild:{}})
	var elemInstance

	describe( 'Create instance of elem',function(){
		it('var elemInstance = new elem.$Constructor()',function(){
			elemInstance = new elem.$Constructor()
		})

		it( 'elemInstance is instance of elem._$Constructor', function () {
			expect(elemInstance).to.be.instanceOf(elem._$Constructor);
		})

		it( 'elemInstance.elemChild === elem.elemChild', function () {
			expect(elemInstance.elemChild).equals(elem.elemChild);
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

		it( 'elemInstance inherited key \'a\'', function () {
			expect(elemInstance._$key).to.equal('a')
		})

		it( 'elemInstance has a path [\'a\']', function () {
			expect(elem.$path).to.deep.equal(['a']);
		})

		it( "elemInstance.elemChild has path ['a','elemChild']", function () {
			expect(elemInstance.elemChild.$path).to.deep.equal(['a','elemChild']);
		})

	})

	describe('Set key \'b\' on instance',function(){
		it('elemInstance.set({$key:\'b\'})',function(){
			elemInstance.set({$key:'b'})
		})

		it( 'elemInstance now has key \'b\'', function () {
			expect(elemInstance._$key).to.equal('b')
		})

		it( 'elemInstance now has a path [\'b\']', function () {
			expect(elemInstance.$path).to.deep.equal(['b']);
		})

		it( "elemInstance.elemChild now has path ['b','elemChild']", function () {
			expect(elemInstance.elemChild.$path).to.deep.equal(['b','elemChild']);
		})

		it( 'elem still has key \'a\'', function () {
			expect(elem._$key).to.equal('a')
		})

		it( 'elem still has path [\'a\']', function () {
			expect(elem.$path).to.deep.equal(['a']);
		})

		it( "elem.elemChild still has path ['a','elemChild']", function () {
			expect(elem.elemChild.$path).to.deep.equal(['a','elemChild']);
		})

	})

	//add child to elemInstance
	describe( 'Add child to instance', function(){

		it('elemInstance.set({ elemInstanceChild:{} })',function(){
			elemInstance.set({ elemInstanceChild:{} })
		})

		it( 'elem does not have child elemInstanceChild', function () {
			expect(elem.elemInstanceChild).to.not.be.ok
		})

		it( 'elemInstance.elemInstanceChild is instance of Element', function () {
			expect(elemInstance.elemInstanceChild).to.be.instanceOf(Element);
		})

		it( 'elemInstance.elemInstanceChild has path [\'b\',\'elemInstanceChild\']', function () {
			expect(elemInstance.elemInstanceChild.$path).to.deep.equal(['b','elemInstanceChild']);
		})

	})

	//add child to original
	describe( 'Add child to original', function(){

		it('elem.set({ elemChild2:{} })',function(){
			elem.set({ elemChild2:{} })
		})

		it( 'elem has child elemChild2', function () {
			expect(elem.elemChild2).to.be.ok
		})

		it( 'elemInstance also has child elemChild2', function () {
			expect(elemInstance.elemChild2).to.be.ok
		})

		it( 'elemInstance.elemChild2 === elem.elemChild2', function () {
			expect(elemInstance.elemChild2).equals(elem.elemChild2);
		})

		it( 'elem.elemChild2 has path [\'a\',\'elemChild2\']', function () {
			expect(elem.elemChild2.$path).to.deep.equal(['a','elemChild2']);
		})

		it( 'elemInstance.elemChild2 has path [\'b\',\'elemChild2\']', function () {
			expect(elemInstance.elemChild2.$path).to.deep.equal(['b','elemChild2']);
		})

	})

})

//remove child from original
describe( 'Removing children', function(){

	var elem = new Element({$key:'a',elemChild:{}, elemChild2:{}})
	var elemInstance = new elem.$Constructor({$key:'b',elemInstanceChild:{}})

	describe( 'Removing child from original', function(){

		it('elem.elemChild.remove()',function(){
			elem.elemChild.remove()
		})

		it( 'elem.elemChild is removed', function () {
			expect(elem.elemChild).to.not.be.ok
		})

		it( 'elemInstance.elemChild also is removed', function () {
			expect(elemInstance.elemChild).to.not.be.ok
		})

	})

	//remove child from instance
	describe( 'Remove child from instance', function(){

		it('elemInstance.elemChild2.remove()',function(){
			elemInstance.elemChild2.remove()
		})

		it( 'elemInstance.elemChild2 is removed', function () {
			expect(elemInstance.elemChild2).to.not.be.ok
		})

		it( 'elem.elemChild2 is not removed', function () {
			expect(elem.elemChild2).to.be.ok
		})

	})

})