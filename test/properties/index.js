var Element 		= require( '../../lib/element' )
var Observable  = require('vjs/lib/observable')


Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/size' ),
  require( '../../lib/property/attributes' ),
  require( '../../lib/property/backgroundcolor' ),
  require( '../../lib/property/backgroundImage' ),
  require( '../../lib/property/text' ),
  require( 'vjs/lib/methods/lookUp' )
)



var a = new Element({
	$backgroundcolor: 'red',
	$text: 'simple text',
	$css: 'test',
	$width: 100,
	$height: 100,
	$attributes: {
		draggable:true
	}
})

<<<<<<< HEAD
console.error( a )
=======

var customImage = new Observable({
	$val: "/test.jpg"
})


var b = new Element({
	$backgroundImage:{
		$val: customImage,
		$on:{
			$error:function (argument) {
				this.$loadError = "error"
			}
		}
	}
})
>>>>>>> f70c2f5b45eeb6bf368813442accabd835d08e55

describe( 'Properties' ,function () {
	it( 'Set background-color on an element', function (done) {
		expect(a.$node.style.backgroundColor).to.be.equal("red")
		done()
	})

	it( 'Set a css class on an element', function (done) {
		expect(a.$node.className).to.be.equal("test")
		done()
	})

	it( 'Set a custom text on an element', function (done) {
		expect(a.$node.textContent).to.be.equal("simple text")
		done()
	})

	it( 'Change the width and the height of an element', function (done) {
		expect(a.$node.style.width).to.be.equal("100px")
		expect(a.$node.style.height).to.be.equal("100px")
		done()
	})
	it( 'Set any attributes on an element', function (done) {
<<<<<<< HEAD
		expect(a.$node.draggable).to.be.equal(true)
=======
		console.log('draggable',a.$node)
		expect(a.$node.draggable).to.be.equal(true)	
>>>>>>> f70c2f5b45eeb6bf368813442accabd835d08e55
		done()
	})
})

<<<<<<< HEAD
console.log(a.$node)
=======
console.log('..',a.$node)

describe( 'Background Image property' ,function () {
	it( 'Trigger erro event if an error occours when loading an image', function (done) {
		expect(b.$backgroundImage.$loadError).to.be.equal('error')
		done()
	})

	it( 'Trigger load event if the image loads with succed', function (done) {		
		// expect(b.$backgroundImage.$success).to.be.equal('true')
		done()	
	})

})
>>>>>>> f70c2f5b45eeb6bf368813442accabd835d08e55
