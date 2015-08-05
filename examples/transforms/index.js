 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ).extended(),
  require( '../../lib/property/draggable' )
)

var thing = window.thing = new Element( {
  $css: 'hello',
  $draggable: true,
  $skewX: '10deg',
  $skewY: '10deg',
  $on: {
    $drag: function(event, e) {
      this.set({
        $rotate: e.x + 'deg',
        $skewX: Math.abs(e.x / 10),
        $skewY: Math.abs(e.y / 10),
        $scaleX: e.x / 5,
        $scaleY: e.y / 5,
        $transformOrigin: e.x
      })
    }
  }
})

app.set( {
  hello: new thing.$Constructor(),
  $draggable: {
    bind: function(){
      return this.hello
    }
  }
})