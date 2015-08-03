 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/draggable' ),
  require( '../../lib/property/text' )
)

var dragPoint = 0
var thing = new Element( {
  $text: 'Hello',
  $css: 'hello',
  // $transformOrigin: null,
  $on: {
    $drag: function(event, e) {
      if (dragPoint > e.x) {
        if (dragPoint - 8 > e.x)
          this.$css.$val = 'hello toRight'
        else
          this.$css.$val = 'hello toRight finished'
      }
      else {
        if (dragPoint + 8 < e.x)
          this.$css.$val = 'hello toLeft'
        else
          this.$css.$val = 'hello toLeft finished'
      }

      dragPoint = e.x
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