require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( 'vjs/lib/methods/lookUp' )
)

var thing = new Element( {
  // $key:'balls',
  $text:'ha'
} )

app.set({
  a:thing
})