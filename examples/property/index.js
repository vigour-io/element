require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/transform' )
)


var thing = new Element( {
  $on: {
    mousedown:function(){
      console.log('DOWN ON TOP')
    }
  },
  $x:200,
  $key:'balls',
  $text: 'balls',
  $css: {
    $val: 'grey-bg',
    $add: ' red-txt '
  }
} )

app.set( {
  a: new thing.$Constructor({
  })
} )