var Element = require( '../../lib/element' )
var elem = new Element()
var changeCount

//add change listener to original
describe('Add $change listener',function(){
	before(function(){
		changeCount = 0
	})

	it('elem.$on.set({ $change:function(){ changeCount++ } })',function(){
		elem.$on.set({
			$change:function(){
				changeCount++
			}
		})
	})

	it( 'elem now has a $change listener', function () {
		expect(elem.$on.$change).to.be.ok
	})

	it( 'changeCount is zero', function () {
		expect(changeCount).to.be.zero
	})
})

//change value of element
describe('Set value',function(){
	before(function(){
		changeCount = 0
	})

	it('elem.$val = 1',function(){
		elem.$val = 1
	})

	it( 'change fired, changeCount is 1', function () {
		expect(changeCount).to.equal(1)
	})
})

//set key
describe('Set key ',function(){
	before(function(){
		changeCount = 0
	})

	it('elem.set({$key:\'a\'})',function(){
		elem.set({$key:'a'})
	})

	it( 'change fired, changeCount is 1', function () {
		expect(changeCount).to.equal(1)
	})
})

//add to parent
describe('Add elem to parent',function(){
	before(function(){
		changeCount = 0
	})

	it('var parent = new Element({ elem:elem })',function(){
		var parent = new Element({ elem:elem })
	})

	it( 'change did not fire, changeCount is 0', function () {
		expect(changeCount).to.equal(0)
	})
})

//set reference
describe('Set reference',function(){
	before(function(){
		changeCount = 0
	})

	it('var ref = new Element(); elem.$val = ref',function(){
		var ref = new Element()
		elem.$val = ref
	})

	it( 'change fired, changeCount is 1', function () {
		expect(changeCount).to.equal(1)
	})
})

//set child
describe('Add child',function(){
	before(function(){
		changeCount = 0
	})

	it('elem.set({child:{}})',function(){
		elem.set({child:{}})
	})

	it( 'change fired, changeCount is 1', function () {
		expect(changeCount).to.equal(1)
	})
})

//set child on child
describe('Add nested child',function(){
	before(function(){
		changeCount = 0
	})

	it('elem.child.set({child:{}})',function(){
		elem.child.set({child:{}})
	})

	it( 'change did not fire, changeCount is 0', function () {
		expect(changeCount).to.equal(0)
	})
})

//remove nested child
describe('Remove nested child',function(){
	before(function(){
		changeCount = 0
	})

	it('elem.child.child.remove()',function(){
		elem.child.child.remove()
	})

	it( 'change did not fire, changeCount is 0', function () {
		expect(changeCount).to.equal(0)
	})
})

//remove child
describe('Remove child',function(){
	before(function(){
		changeCount = 0
	})

	it('elem.child.remove()',function(){
		elem.child.remove()
	})

	it( 'change fired, changeCount is 1', function () {
		expect(changeCount).to.equal(1)
	})
})