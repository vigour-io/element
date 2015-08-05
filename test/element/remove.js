var Element = require( '../../lib/element' )
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