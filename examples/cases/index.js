require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )
// var Operator = require('vjs/lib/operator')
Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/backgroundImage' )
)
// console.clear()


// var cases = require('../../lib/cases')

// cases.set({
// 	$connected:false,
// 	$isreceiver:true
// })

var a = new Element({
	$css:'funlife',
  $text:{
	  $val: 'A & ',
	  $add:'bawler'
  },
  $on:{
  	$click:function(){
  		console.error('HEY!!')
  	}
  },
  $backgroundImage:'http://www.cdc.gov/importation/images/dog2.jpg'
})

app.set({
	a:new a.$Constructor()
})

app.set({
	b:new Element({
	  $text:{
		  $val: 'B & ',
		  $add:'bawler'
	  },
	  c:new a.$Constructor({
	  	d:new a.$Constructor()
	  })
	})
})

