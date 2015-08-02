require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' )
)

var thing = new Element( {
  $text: 'Hello',
  $css: 'hello'
});


app.set( {
  a: new thing.$Constructor({

  })
})