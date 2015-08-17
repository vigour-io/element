 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/animate' )
)

var thing = window.thing = new Element( {
  $css : "teste",
  $x: 100,
  $y: 200
})

app.set( {
  hello: new thing.$Constructor(),
  $on:{
    $click:function(event, e){
      this.hello.set({
        $animate:{
          $x: e.x,
          $y: e.y,
          $opacity: 0.2,
          $easing: 'easeInOut',
          $time: 600,
          $delay: 500,
          $callback: function () {
            console.log('done', new Date())
          }
        }
      })
    }
  }
})
