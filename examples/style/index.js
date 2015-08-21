require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/style' )
)

var thing = new Element( {
  $text: 'Hello',
  $css: 'hello',
  $style: {
    'background-color': 'blue'
  }
})

app.set({
  a: thing
})