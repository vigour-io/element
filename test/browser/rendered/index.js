var Element = require( '../../../lib/element' )
var app 		= require( '../../../lib/app' )
var count = 0

beforeEach(function(){
	count = 0
})

describe('on rendered',function(){

	var el = new Element({
		$key:'elem',
		$on:{
			$render:function(){
				console.log('party!!',this)
			}
		}
	})

	it('blur',function(){
		// app.set({
		// 	rendered:true,
		// 	elem:el
		// })

	console.log('????',el.$on.$property)

	console.log('CHECK',obj.$on.$property)
	console.log('ELEM',el)

	console.log('\nsmurrrrr',obj === el)

	el.on('$property',function(){
		console.error('!')
	})

		el.set({
			rendered:true
		})
	})

})