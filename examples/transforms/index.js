 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )
var mixin = require( '../../lib/mixins/transforms' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  // require( '../../lib/property/transforms/basic' ),
  require( '../../lib/property/transforms/extended' ),
  require( '../../lib/property/draggable' )
)

var thing = window.thing = new Element( {
  $css: 'hello',
  $draggable: true,
  $on: {
    $drag: function(event, e) {
      this.set({
        $rotate: e.x + 'deg',
        $skewX: e.x / 10,
        $skewY: e.y / 10,
        $scaleX: e.x / 5,
        $scaleY: e.y / 5
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