var Element = require( '../../lib/element' )

it('var $new = {a:0,b:0}')
it('var $change = {a:0,b:0}')
it('var $property = {a:0,b:0}')
it('var $addToParent = {a:0,b:0}')

var elem = new Element()
var elemInstance
var a = {}
var b = {}


var $new = {a:0,b:0}
var $change = {a:0,b:0}
var $property = {a:0,b:0}
var $addToParent = {a:0,b:0}

describe( 'Element', function () {
		
	//create element
	describe( 'Create new element \'elem\'', function(){

		it( 'var elem = new Element()')		

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
	describe( 'Set key \'a\'', function(){
		
		it('elem.set({ $key:\'a\' })')

		it( 'elem now has key \'a\'', function () {
			elem.set({$key:'a'})
			expect(elem._$key).to.equal('a');
		})

		it( 'elem now has a path [\'a\']', function () {
			expect(elem.$path).to.deep.equal(['a']);
		})

		it( 'elem still has no context', function () {
			expect(elem._$context).to.not.be.ok;
		})

	})

	//add change listener to original
	describe( 'Add a change listener',function(){
		
		before(function(){
			elem.$on.set({
				$change:function(){
					$change[this._$key]++
				}
			})
		})

		it('elem.$on.set({ $change:function(){ $change[this._$key]++ } })')

		it( 'elem now has a $change listener', function () {
			expect(elem.$on.$change).to.be.ok
		})

		it( '$change.a is zero', function () {
			expect($change.a).to.be.zero
		})

	})

	//add change listener to original
	describe( 'Add $new listener',function(){

		before(function(){
			elem.$on.set({
				$new:function(){
					$new[this._$key]++
				}
			})
		})

		it('elem.$on.set({ $new:function(){ $new[this._$key]++ } })')

		it( 'elem now has a $new listener', function () {
			expect(elem.$on.$new).to.be.ok
		})

		it( '$new.a is zero', function () {
			expect($new.a).to.be.zero
		})

	})

	//add change listener to original
	describe( 'Add $addToParent listener',function(){

		before(function(){
			elem.$on.set({
				$addToParent:function(){
					$addToParent[this._$key]++
				}
			})
		})

		it('elem.$on.set({ $addToParent:function(){ $addToParent[this._$key]++ } })')

		it( 'elem now has a addToParent listener', function () {
			expect(elem.$on.$addToParent).to.be.ok
		})

		it( '$addToParent.a is zero', function () {
			expect($addToParent.a).to.be.zero
		})

	})

	//add change listener to original
	describe( 'Add $property listener',function(){

		before(function(){
			elem.$on.set({
				$property:function(){
					$property[this._$key]++
				}
			})
		})

		it('elem.$on.set({ $property:function(){ $property[this._$key]++ } })')

		it( 'elem now has a property listener', function () {
			expect(elem.$on.$property).to.be.ok;
		})

		it( '$property.a is zero', function () {
			expect($property.a).to.equal(0)
		})

	})

	//add child
	describe( 'Add children on elem', function(){

		before(function(){
			elem.set({ elemChild:{}, elemChild2:{} })
		})

		it('elem.set({ elemChild:{}, elemChild2:{} })')

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

		describe('-> events:elem',function(){
			it( '$change fired -> $change.a is one', function () {
				expect($change.a).to.equal(1);
			})

			it( '$property fired -> $property.a is one', function () {
				expect($property.a).to.equal(1);
			})

			it( '$new did not fire -> $new.a is still zero', function () {
				expect($new.a).to.equal(0);
			})

			it( '$addToParent did not fire -> $addToParent.a is still zero', function () {
				expect($addToParent.a).to.equal(0);
			})
		})

	})

	//create instance of elem
	describe( 'Create instance of original elem, with key \'b\'', function(){

		before(function(){
			elemInstance = new elem.$Constructor({$key:'b'})
		})

		it('var elemInstance = new elem.$Constructor({$key:\'b\'})')

		it( 'elemInstance is instance of elem._$Constructor', function () {
			expect(elemInstance).to.be.instanceOf(elem._$Constructor);
		})

		it( 'elemInstance.elemChild is instance of elem.elemChild._$Constructor', function () {
			expect(elemInstance.elemChild).to.be.instanceOf(elem.elemChild._$Constructor);
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

		describe('-> events:elem',function(){
			
			it( '$new did not fire -> $new.a is still zero', function () {
				expect($new.a).to.equal(0);
			})

			it( '$property did not fire -> $property.a is still one', function () {
				expect($property.a).to.equal(1);
			})

			it( '$addToParent did not fire -> $addToParent.a is still zero', function () {
				expect($addToParent.a).to.equal(0);
			})

			it( '$change did not fire -> $change.a is still one', function () {
				expect($change.a).to.equal(1);
			})

		})

		describe('-> events:elemInstance',function(){
			it( '$new fired -> $new.b is now one', function () {
				expect($new.b).to.equal(1);
			})

			it( '$change fired -> $change.b is now one', function () {
				expect($change.b).to.equal(1);
			})

			it( '$property did not fire -> $property.b is still zero', function () {
				expect($property.b).to.equal(0);
			})

			it( '$addToParent did not fire -> $addToParent.b is still zero', function () {
				expect($addToParent.b).to.equal(0);
			})
		})

	})

	//add child to elemInstance
	describe( 'Add child to instance', function(){

		before(function(){
			elemInstance.set({ elemInstanceChild:{} })
		})

		it('elemInstance.set({ elemInstanceChild:{} })')

		it( 'elem does not have child elemInstanceChild', function () {
			expect(elem.elemInstanceChild).to.not.be.ok
		})

		it( 'elemInstance.elemInstanceChild is instance of Element', function () {
			expect(elemInstance.elemInstanceChild).to.be.instanceOf(Element);
		})

		it( 'elemInstance.elemInstanceChild has path [\'b\',\'elemInstanceChild\']', function () {
			expect(elemInstance.elemInstanceChild.$path).to.deep.equal(['b','elemInstanceChild']);
		})

		describe('-> events:elem',function(){
			
			it( '$new did not fire -> $new.a is still zero', function () {
				expect($new.a).to.equal(0);
			})

			it( '$property did not fire -> $property.a is still one', function () {
				expect($property.a).to.equal(1);
			})

			it( '$addToParent did not fire -> $addToParent.a is still zero', function () {
				expect($addToParent.a).to.equal(0);
			})

			it( '$change did not fire -> $change.a is still one', function () {
				expect($change.a).to.equal(1);
			})

		})

		describe('-> events:elemInstance',function(){
			it( '$change fired -> $change.b is now two', function () {
				expect($change.b).to.equal(2);
			})

			it( '$property fired -> $property.b is now one', function () {
				expect($property.b).to.equal(1);
			})

			it( '$new did not fire -> $new.b is still one', function () {
				expect($new.b).to.equal(1);
			})

			it( '$addToParent did not fire -> $addToParent.b is still zero', function () {
				expect($addToParent.b).to.equal(0);
			})
		})

	})

	//remove child from original
	describe( 'Remove child from elem', function(){
		
		before(function(){
			elem.elemChild.remove()
		})

		it('elem.elemChild.remove()')

		it( 'elem.elemChild is removed', function () {
			expect(elem.elemChild).to.not.be.ok
		})

		it( 'elemInstance.elemChild also is removed', function () {
			expect(elemInstance.elemChild).to.not.be.ok
		})

		describe('-> events:elem',function(){

			it( '$change fired -> $change.a is now two', function () {
				expect($change.a).to.equal(2);
			})

			it( '$property fired -> $property.a is now two', function () {
				expect($property.a).to.equal(2);
			})
			
			it( '$new did not fire -> $new.a is still zero', function () {
				expect($new.a).to.equal(0);
			})

			it( '$addToParent did not fire -> $addToParent.a is still zero', function () {
				expect($addToParent.a).to.equal(0);
			})

		})

		describe('-> events:elemInstance',function(){
			it( '$change fires -> $change.b is now three', function () {
				expect($change.b).to.equal(3);
			})

			it( '$property fired -> $property.b is now two', function () {
				expect($property.b).to.equal(2);
			})

			it( '$new did not fire -> $new.b is still one', function () {
				expect($new.b).to.equal(1);
			})

			it( '$addToParent did not fire -> $addToParent.b is still zero', function () {
				expect($addToParent.b).to.equal(0);
			})
		})

	})

	//remove child from instance
	describe( 'Remove child from instance', function(){

		before(function(){
			elemInstance.elemChild2.remove()
		})

		it('elemInstance.elemChild2.remove()')

		it( 'elemInstance.elemChild2 is removed', function () {
			expect(elemInstance.elemChild2).to.not.be.ok
		})

		it( 'elem.elemChild2 is not removed', function () {
			expect(elem.elemChild2).to.be.ok
		})

		describe('-> events:elem',function(){

			it( '$change did not fire -> $change.a is still two', function () {
				expect($change.a).to.equal(2);
			})

			it( '$property did not fire -> $property.a is still two', function () {
				expect($property.a).to.equal(2);
			})
			
			it( '$new did not fire -> $new.a is still zero', function () {
				expect($new.a).to.equal(0);
			})

			it( '$addToParent did not fire -> $addToParent.a is still zero', function () {
				expect($addToParent.a).to.equal(0);
			})

		})

		describe('-> events:elemInstance',function(){
			it( '$change fires -> $change.b is now four', function () {
				expect($change.b).to.equal(4);
			})

			it( '$property fired -> $property.b is now three', function () {
				expect($property.b).to.equal(3);
			})

			it( '$new did not fire -> $new.b is still one', function () {
				expect($new.b).to.equal(1);
			})

			it( '$addToParent did not fire -> $addToParent.b is still zero', function () {
				expect($addToParent.b).to.equal(0);
			})
		})

	})

})