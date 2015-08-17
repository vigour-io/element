console.clear()

require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/opacity' ),
  require( '../../lib/property/transition' ),
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
    $click: function(event, e){
      this.hello.set({
        $animate: {
          $css3: false,
          $x: e.x,
          $y: e.y,
          $opacity: Math.random(),
          $easing: 'easeIn',
          // $time: Math.random() * 1000,
          $time: 1000,
          $delay: 0,
          $callback: function (event) {

            console.log(this, event)

            thing.set({
              $backgroundColor: 'green'
            })
          }
        }
      })
    }
  }
})
