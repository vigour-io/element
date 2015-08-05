var Element = require( '../../lib/element' )
var elem = new Element()
var addToParentCount

//add addToParent listener to original
describe('Add $addToParent listener',function(){
	before(function(){
		addToParentCount = 0
	})

	it('elem.$on.set({ $addToParent:function(){ addToParentCount++ } })',function(){
		elem.$on.set({
			$addToParent:function(){
				addToParentCount++
			}
		})
	})

	it( 'elem now has a $addToParent listener', function () {
		expect(elem.$on.$addToParent).to.be.ok
	})

	it( 'addToParentCount is zero', function () {
		expect(addToParentCount).to.be.zero
	})
})

//addToParent value of element
describe('Set value',function(){
	before(function(){
		addToParentCount = 0
	})

	it('elem.$val = 1',function(){
		elem.$val = 1
	})

	it('addToParent did not fire, addToParentCount is 0', function () {
		expect(addToParentCount).to.equal(0)
	})
})

//set key
describe('Set key ',function(){
	before(function(){
		addToParentCount = 0
	})

	it('elem.set({$key:\'a\'})',function(){
		elem.set({$key:'a'})
	})

	it( 'addToParent did not fire, addToParentCount is 0', function () {
		expect(addToParentCount).to.equal(0)
	})
})

//add to parent
describe('Add elem to parent',function(){
	before(function(){
		addToParentCount = 0
	})

	it('var parent = new Element({ elem:elem })',function(){
		var parent = new Element({ elem:elem })
	})

	it( 'addToParent fired, addToParentCount is 1', function () {
		expect(addToParentCount).to.equal(1)
	})
})

//set reference
describe('Set reference',function(){
	before(function(){
		addToParentCount = 0
	})

	it('var ref = new Element(); elem.$val = ref',function(){
		var ref = new Element()
		elem.$val = ref
	})

	it( 'addToParent did not fire, addToParentCount is 0', function () {
		expect(addToParentCount).to.equal(0)
	})
})

//set child
describe('Add child',function(){
	before(function(){
		addToParentCount = 0
	})

	it('elem.set({child:{}})',function(){
		elem.set({child:{}})
	})

	it( 'addToParent did not fire, addToParentCount is 0', function () {
		expect(addToParentCount).to.equal(0)
	})
})

//set child on child
describe('Add nested child',function(){
	before(function(){
		addToParentCount = 0
	})

	it('elem.child.set({child:{}})',function(){
		elem.child.set({child:{}})
	})

	it( 'addToParent did not fire, addToParentCount is 0', function () {
		expect(addToParentCount).to.equal(0)
	})
})

//remove nested child
describe('Remove nested child',function(){
	before(function(){
		addToParentCount = 0
	})

	it('elem.child.child.remove()',function(){
		elem.child.child.remove()
	})

	it( 'addToParent did not fire, addToParentCount is 0', function () {
		expect(addToParentCount).to.equal(0)
	})
})

//remove child
describe('Remove child',function(){
	before(function(){
		addToParentCount = 0
	})

	it('elem.child.remove()',function(){
		elem.child.remove()
	})

	it( 'addToParent did not fire, addToParentCount is 0', function () {
		expect(addToParentCount).to.equal(0)
	})
})