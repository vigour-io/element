var Element = require( '../../../lib/element' )
var app 		= require( '../../../lib/app' )
var count = 0

beforeEach(function(){
	count = 0
})

describe('on rendered',function(){

	var el = new Element({
		$key:'elem',
		// $on:{
		// 	$render:function(){
		// 		console.log('party!!',this)
		// 	}
		// }
	})

	el.on('$addToParent',function(){
		console.error('KANKER')
	})

 //  el.subscribe({
	// 	$upward:{
	// 		flups:true
	// 	}
	// },function( event, meta ){
	// 	console.error('WHAT')
	// 	console.log('>>>',this,el)
	// 	// this.emit( key, event, meta )
	// })

	// it('blur',function(){
		app.set({
			flups:true
		})
	// })

})