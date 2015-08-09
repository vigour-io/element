var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

var elem = new Element({
  $key: 'a',
  elemChild: {},
  elemChild2: {}
})

var elemInstance = new elem.$Constructor({
  $key: 'b',
  elemInstanceChild: {}
})

app.set({
	elem:elem,
	elemInstance:elemInstance
})

describe( 'Removing child from original', function(){
	it('app.elem.elemChild.remove()',function(){
		console.clear()
		elem.elemChild.remove()
		console.log('---------')
	})

	it( 'app.elem.elemChild is removed', function () {
		expect(elem.elemChild).to.not.be.ok
	})

	it( 'app.elemInstance.elemChild is also removed', function () {
		expect(elemInstance.elemChild).to.not.be.ok
	})

	//TODO: this test is good, we need to fix remove for nodes, and uncomment the test
	it( 'app.elem.elemChild and app.elemInstance.elemChild nodes are removed', function () {
		expect(document.getElementsByClassName('elemChild').length).to.not.be.ok
	})

})

//remove child from instance
describe( 'Remove child from instance', function(){

	it('app.elemInstance.elemChild2.remove()',function(){
		elemInstance.elemChild2.remove()
	})

	it( 'app.elemInstance.elemChild2 is removed', function () {
		expect(elemInstance.elemChild2).to.not.be.ok
	})

	it( 'app.elem.elemChild2 is not removed', function () {
		expect(elem.elemChild2).to.be.ok
	})

	//TODO: this test is good, we need to fix remove for nodes, and uncomment the test
	it( 'only app.elemInstance.elemChild2 node is removed', function () {
		expect(document.getElementsByClassName('elemChild2').length).to.not.be.one
	})

})

describe( 'Removing original', function(){
	it('app.elem.remove()',function(){
		app.elem.remove()
	})

	it( 'app.elem is removed', function () {
		expect(app.elem).to.not.be.ok
	})

	it( 'app.elemInstance is removed', function () {
		expect(app.elemInstance).to.not.be.ok
	})

	//TODO: this test is good, we need to fix remove for nodes, and uncomment the test
	it( 'app.elem.elemChild and app.elemInstance.elemChild nodes are removed', function () {
		expect(document.getElementsByClassName('elemChild').length).to.not.be.ok
	})

})