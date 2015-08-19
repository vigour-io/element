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

app.set({
  circle: {
    $x: {
      $val: 100,
      $animation: {
        $duration: 36,
        $start: -1000,
        $end: 400
      }
    },
    $y: {
      $val: 200,
      // $animation: {
      //   $duration: 16
      // }
    }
  },
  // rectangle: {
  //   $x: {
  //     $val: 400,
  //     $animation: {
  //       $duration: 16
  //     }
  //   },
  //   $y: {
  //     $val: 600,
  //     $animation: {
  //       $duration: 12
  //     }
  //   }
  // },
  // triangle: {
  //   $draggable: true,
  //   $x: {
  //     $val: 700,
  //     $animation: {
  //       $duration: 38,
  //       $start: -200
  //     }
  //   },
  //   $y: {
  //     $val: 100,
  //     // $animation: {
  //     //   $duration: 6
  //     // }
  //   }
  // },

  $on: {
    $click: function (event, e) {

      // app.circle.setKey('$x', e.x - Math.random() * 700)
      // app.circle.setKey('$y', e.y + Math.random() * 350)

      // app.rectangle.setKey('$x', e.x + Math.random() * 350)
      // app.rectangle.setKey('$y', e.y - Math.random() * 700)

      app.circle.setKey('$x', e.x)
    }
  }
})