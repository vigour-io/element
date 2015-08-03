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
  // $on: {
  //   $drag: function(event, e) {
  //     if (dragPoint > e.x)
  //       this.$css.$val = 'hello toRight'
  //     else
  //       this.$css.$val = 'hello toLeft'

  //     // this.$transformOrigin.$val = e.layerX + ' ' + e.layerY

  //     dragPoint = e.x
  //   }
  // }
});


app.set( {
  hello: new thing.$Constructor(),
  $draggable: {
    bind: function(){
      return this.hello
    }
  }
})