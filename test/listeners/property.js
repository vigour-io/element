var Element = require( '../../lib/element' )
var elem = new Element()
var propertyCount

//add property listener to original
describe('Add $property listener',function(){
	before(function(){
		propertyCount = 0
	})

	it('elem.$on.set({ $property:function(){ propertyCount++ } })',function(){
		elem.$on.set({
			$property:function(){
				propertyCount++
			}
		})
	})

	it( 'elem now has a $property listener', function () {
		expect(elem.$on.$property).to.be.ok
	})

	it( 'propertyCount is zero', function () {
		expect(propertyCount).to.be.zero
	})
})

//property value of element
describe('Set value',function(){
	before(function(){
		propertyCount = 0
	})

	it('elem.$val = 1',function(){
		elem.$val = 1
	})

	it( 'property did not fire, propertyCount is 0', function () {
		expect(propertyCount).to.equal(0)
	})
})

//set key
describe('Set key ',function(){
	before(function(){
		propertyCount = 0
	})

	it('elem.set({$key:\'a\'})',function(){
		elem.set({$key:'a'})
	})

	it( 'property did not fire, propertyCount is 0', function () {
		expect(propertyCount).to.equal(0)
	})
})

//add to parent
describe('Add elem to parent',function(){
	before(function(){
		propertyCount = 0
	})
	
	it('var parent = new Element({ elem:elem })',function(){
		var parent = new Element({ elem:elem })
	})

	it( 'property did not fire, propertyCount is 0', function () {
		expect(propertyCount).to.equal(0)
	})
})

//set reference
describe('Set reference',function(){
	before(function(){
		propertyCount = 0
	})

	it('var ref = new Element(); elem.$val = ref',function(){
		var ref = new Element()
		elem.$val = ref
	})

	it( 'property did not fire, propertyCount is 0', function () {
		expect(propertyCount).to.equal(0)
	})
})

//set child
describe('Add child',function(){
	before(function(){
		propertyCount = 0
	})

	it('elem.set({child:{}})',function(){
		elem.set({child:{}})
	})

	it( 'property fired, propertyCount is 1', function () {
		expect(propertyCount).to.equal(1)
	})
})

//set child on child
describe('Add nested child',function(){
	before(function(){
		propertyCount = 0
	})

	it('elem.child.set({child:{}})',function(){
		elem.child.set({child:{}})
	})

	it( 'property did not fire, propertyCount is 0', function () {
		expect(propertyCount).to.equal(0)
	})
})

//remove nested child
describe('Remove nested child',function(){
	before(function(){
		propertyCount = 0
	})

	it('elem.child.child.remove()',function(){
		elem.child.child.remove()
	})

	it( 'property did not fire, propertyCount is 0', function () {
		expect(propertyCount).to.equal(0)
	})
})

//remove child
describe('Remove child',function(){
	before(function(){
		propertyCount = 0
	})

	it('elem.child.remove()',function(){
		elem.child.remove()
	})

	it( 'property fired, propertyCount is 1', function () {
		expect(propertyCount).to.equal(1)
	})
})