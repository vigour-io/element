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

describe( 'Properties' ,function () {
	// var a = new Element({
	// 	$backgroundcolor: 'red',
	// 	$text: 'simple text',
	// 	$css: 'test',
	// 	$width: 100,
	// 	$height: 100,
	// 	$attributes: {
	// 		draggable:true
	// 	}
	// })

	// var customImage = new Observable({
	// 	$val: "/test.jpg"
	// })

	// var b = new Element({
	// 	$backgroundImage:{
	// 		$val: customImage,
	// 		$on:{
	// 			$error:function (argument) {
	// 				this.$loadError = "error"
	// 			}
	// 		}
	// 	}
	// })

	
	describe( '$css', function(){
		
		// it( 'elem now has key \'elemKey\'', function () {
		// 	elem.set({$key:'elemKey'})
		// 	expect(elem._$key).to.equal('elemKey');
		// })

		// it( 'elem now has a path [\'elemKey\']', function () {
		// 	expect(elem.$path).to.deep.equal(['elemKey']);
		// })

		// it( 'elem still has no context', function () {
		// 	expect(elem._$context).to.not.be.ok;
		// })

	})




	// it( 'Set background-color on an element', function (done) {
	// 	expect(a.$node.style.backgroundColor).to.equal("red")
	// 	done()
	// })

	// it( 'Set a css class on an element', function (done) {
	// 	expect(a.$node.className).to.equal("test")
	// 	done()
	// })

	// it( 'Set a custom text on an element', function (done) {
	// 	expect(a.$node.textContent).to.equal("simple text")
	// 	done()
	// })

	// it( 'Change the width and the height of an element', function (done) {
	// 	expect(a.$node.style.width).to.equal("100px")
	// 	expect(a.$node.style.height).to.equal("100px")
	// 	done()
	// })
	// it( 'Set any attributes on an element', function (done) {
	// 	expect(a.$node.draggable).to.be.true
	// 	done()
	// })
})

// describe( 'Background Image property' ,function () {
// 	it( 'Trigger erro event if an error occours when loading an image', function (done) {
// 		expect(b.$backgroundImage.$loadError).to.equal('error')
// 		done()
// 	})
// 	it( 'Trigger load event if the image loads with succed', function (done) {
// 		// expect(b.$backgroundImage.$success).to.be.equal('true')
// 		done()
// 	})
// })
