 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/backgroundcolor' ),
  require( '../../lib/property/draggable' )
)

var asd

var thing = window.thing = new Element( {
  $css: 'hello test',
  $on: {
    $click: function () {

    }
  }
})

app.set( {
  hello: new thing.$Constructor()
})
