require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require('../../lib/cases')
)

console.clear()
cases.set({
	$connected:true,
	$isreceiver:true
})

app.set({
  b:new Element({
	  $text:{
		  $val: 'not desk!!',
		  $desktop:{
		  	$val:'smur!!',
		  	// $case:true//or false
		  	// $add:'desktop!!' //an operator which is an instance of observable
		  }
	  }
  })
})