var Element = require('../../lib/element')

Element.prototype.inject(
  require('../../lib/property/backgroundcolor') 
)

var element
var childElement

describe( '--> backgroundColor', function(){
	element = new Element({
		$backgroundColor:"red"
	})
	
	it( 'should set the backgound color for element',function(done){
		expect(element.$node.style.backgroundColor).to.be.equal("red")
		done()
	})

	it( 'should change the background color for element',function (done) {
		element.set({
			$backgroundColor:"black"
		})
		expect(element.$node.style.backgroundColor).to.be.equal("black")
		done()
	})
	//setting back the original state of element( with backgound color red )
	afterEach(function(){
		element.set({
			$backgroundColor:"red"
		})
	})

	describe('--> inheritance',function () {

		childElement = new element.$Constructor()

		it('childElement should inherit the background color from elemet' ,function (done) {
			expect(childElement.$node.style.backgroundColor).to.be.equal("red")
			done()
		})

		it( 'childElement should be able to change the background color',function (done) {
				childElement.set({
					$backgroundColor:"blue"
				})

				expect(childElement.$node.style.backgroundColor).to.be.equal("blue")
				done()
		}) 

		it( 'element should stay with the same color',function (done) {
			expect(element.$node.style.backgroundColor).to.be.equal("red")
			done()
		})

		it( 'element background color chages should not change childElement backgound color',function (done) {
			element.set({
				$backgroundColor:"green"
			})
			expect(childElement.$node.style.backgroundColor).to.be.equal("blue")
			done()
		})
	})

}) 




