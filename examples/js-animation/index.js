console.clear()

require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/opacity' ),
  require( '../../lib/property/transition' ),
  require( '../../lib/property/animate' ),
  require( '../../lib/property/draggable' ),
  require( '../../lib/property/backgroundColor' )
)

var thing = window.thing = new Element( {
  $css : "test",
  $draggable:{
    x:true
  },
  $x: {
    $val: 100,
    $animation: {
      $duration: 24,
      $easing: 'easeIn'
    }
  },
  $opacity: {
    $val: 0.1,
    $animation: {
      $duration: 24,
      $easing: 'easeIn'
    }
  },
  $on:{
    $transitionend:function(){
      console.log('DONE you cray man')
    }
  }
  // $y: {
  //   $val: 200,
  //   $animation: {
  //     $duration: 25,
  //     $easing: 'easeIn'
  //   }
  // }
})

app.set({
  hello: thing,
  $on: {
    $click: function(event, e){
      this.hello.set({
        $x: e.x,
        $opacity: Math.random()
      })
    }
  }
})
