require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( 'vjs/lib/methods/lookUp' )
)


var Observable = require('vjs/lib/observable')
// Observable.prototype.inject(require('vjs/lib/operator/add'))

a = new Observable({
  $key:'a',
  $val:1
})

b = new Observable({
  $key:'b',
  $val:1
})

c = new Observable({
  $val: a,
  $add: b
})

a.$val = 'x'
b.$val = 'y'

var thing = new Element( {
  $text:{
	  $val: 'a',
	  $add: 'b'
  }
} )

var Event = require( 'vjs/lib/event' )
var bla = new Event(app)

app.set({
  b:new Element({
	  $text:{
		  $val: 'a',
		  $add: 'b'
	  }
  })
})



console.log(c.$val)

// console.log(app.a.$text.$val)