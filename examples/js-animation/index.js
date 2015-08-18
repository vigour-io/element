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
  require( '../../lib/property/backgroundColor' )
)

var thing = window.thing = new Element({
  $css: "teste",
  $x:{
    $val:20,
    $animation:true
  },
  $y: 200
})

app.set( {
  hello: new thing.$Constructor(),
  $on:{
    $click: function(event, e){
      this.hello.$x.$val = e.x
      // this.hello.set({
      //   $animate: {
      //     $css3: true,
      //     $x: { $val:e.x, $sub:100 },
      //     $y: e.y,
      //     $opacity: Math.random() + 0.1,
      //     $easing: 'easeIn',
      //     $duration: Math.random() * 1000,
      //     $delay: 0,
      //     $callback: function (event) {
      //       this.set({
      //         $backgroundColor: this.$backgroundColor && this.$backgroundColor.$val === 'green' ? '' : 'green'
      //       })
      //     }
      //   }

      // })
    }
  }
})