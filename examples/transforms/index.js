 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/draggable' )
)

var thing = window.thing = new Element( {
  $css: 'hello',
  $draggable: true,
  $rotate: void 0,
  $skewX: void 0,
  $skewY: void 0,
  $skew: void 0,
  $translate3d: void 0,
  $scaleX: void 0,
  $scaleY: void 0,
  $scale: void 0,
  $on: {
    $drag: function(event, e) {
      e.preventDefault()

      this.$rotate.$val = e.x / 4

      this.$skewX.$val = e.x / 10
      this.$skewY.$val = e.y / 10

      this.$scaleX.$val = e.x / 4
      this.$scaleY.$val = e.y / 4
    }
  }
});


app.set( {
  hello: new thing.$Constructor(),
  $draggable: {
    bind: function(){
      return this.hello
    }
  }
})