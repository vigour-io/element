require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ) 
)
// console.clear()


// var cases = require('../../lib/cases')

// cases.set({
// 	$connected:false,
// 	$isreceiver:true
// })

var b = new Element({
  $text:{
	  $val: 'not desk!!',
	  $add:'bawler'
  }
})

app.set({
  b:b
})