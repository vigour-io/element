var Element = require('../../lib/element')
var Observable = require('vjs/lib/observable')

// var expect = chai.expect

Element.prototype.inject(
  require('../../lib/property/backgroundcolor') 
)

var element

describe( 'backgroundColor', function(){
	beforeEach(function () {
		element = new Element({
			$backgroundColor:"red"
		})
	})
	it( 'should set the backgound color for element',function(){
		expect(element.$node.style.backgroundColor).to.be.equal("red")

	} )

	it( 'should change the backgroundColor for element',function (done) {
		element.set({
			$backgroundColor:"black"
		})
		expect(element.$node.style.backgroundColor).to.be.equal("black")
		done()
	} ) 

} ) 