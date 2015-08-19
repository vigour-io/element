var Element = require( '../../lib/element' )
var app 		= require( '../../lib/app' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/backgroundImage' )
)

var cases = require('../../lib/cases')
var phoneSize = 300


describe( '--> Using Cases' , function () {
	//Arrange
	cases.set({
		$normalScreen:{
			$val:app.$width,
			$transform:function(val,event) {
				return val > 400
			}
		},
		$smallScreen:{
			$val: phoneSize,
			$transform:function(val,event) {
				return val < 400
			}
		}
	})
	//Act
	var a = new Element({
		$css:{
			$val:"class1",
			$desktop:{
				$normalScreen:"class2"
			}
		},
		$text:{
			$val:'text 1',
			$desktop:{
				$val:"bla",
				$normalScreen:"text 2"
			},
			$phone:{
				$val:"text 1 mobile",
				$smallScreen:"text 2 mobile"
			}
		}
	})

	afterEach(function (done) {
		cases.$desktop.$val = true
		cases.$phone.$val = false
		done()
	})
	//Assert
	it( 'change the text element when desktop' , function (done) {
		expect(a.$text.$val).to.be.equal("text 2")
		done()
	})

	it( 'change the text element when phone' , function (done) {
		cases.$phone.$val = true 
		expect(a.$text.$val).to.be.equal("text 2 mobile")
		done()
	})

	it( 'using the same case to update two properties (css and text)' ,function (done) {
		expect(a.$text.$val).to.be.equal("text 2")
		expect(a.$css.$val).to.be.equal("class2")
		done()
	})

	describe ( 'inheritance of element with cases' , function (argument) {
		var b = new a.$Constructor({})

		it( 'inherit text cases logic from element a' ,function (done) {
			expect(b.$text.$val).to.be.equal("text 2")
			done()	
		})

		it( 'changes in b should update only b' ,function (done) {
			
			b.set({
				$text:{
					$val:"b default text",
					$desktop: {
						$normalScreen:"b text"
					}
				}
			})

			expect(b.$text.$val).to.be.equal("b text")
			done()	
		})

		it( 'should not update a' , function (done) {
			expect(a.$text.$val).to.be.equal("text 2")		
			done()
		})

		// Talk with Youzi 
		// ===> it should not because you've set a different value on b, which creates it's own instance, decoupling it from a
		it ( 'a changes should not update b as well' , function (done) {
			a.$text.set({
				$desktop:{
					$normalScreen: "new value for a"
				}
			})
			expect(b.$text.$val).to.not.be.equal("new value for a")
			done()
		})
		
		// Talk with Youzii
		// ===> have to test if this works for operators in general (in vjs)
		describe( 'remove cases property' , function () {
		
			it( 'remove cases from b' , function (done) {
				b.$text.$desktop.remove()
				expect(b.$text.$desktop).to.be.null
				done()
			})

		})		
	})
})






