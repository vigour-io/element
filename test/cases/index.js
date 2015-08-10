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
		$smallScrenn:{
			$val: phoneSize,
			$transform:function(val,event) {
				return val < 400
			}
		}
	})
	//Act
	var a = new Element({
		$css:{
			$val:"screenClass",
			$desktop:{
				$normalScreen:"normalScreenClass"
			}
		},
		$text:{
			$val:'default text',
			$desktop:{
				$val:"bla",
				$normalScreen:"desktop text"
			},
			$phone:{
				$val:"simple text",
				$smallScrenn:"small text"
			}
		}
	})

	afterEach(function (done) {
		cases.$desktop.$val = true
		cases.$phone.$val = false
		done()
	})
	//Asserts
	it( 'change the text element when desktop' , function (done) {
		expect(a.$text.$val).to.be.equal("desktop text")
		done()
	})

	it( 'change the text element when phone' , function (done) {
		cases.$phone.$val = true 
		expect(a.$text.$val).to.be.equal("small text")
		done()
	})

	it( 'using the same case to update two properties' ,function (done) {
		expect(a.$text.$val).to.be.equal("desktop text")
		expect(a.$css.$val).to.be.equal("normalScreenClass")
		done()
	})

})