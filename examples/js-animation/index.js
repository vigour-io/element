require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/opacity' ),
  require( '../../lib/property/transition' ),
  require( '../../lib/property/draggable' )
)

app.set({
  circle: {
    $css: 'circle draggable',
    $x: {
      $val: 100,
      $animation: {
        $duration: 30
      }
    },
    $y: {
      $val: 200,
      $animation: {
        $duration: 16
      }
    },
    $draggable: true,
    $on: {
      $dragend: function (event, e) {
        app.rectangle.setKey('$x', e.x + Math.random() * 250)
        app.rectangle.setKey('$y', e.y - Math.random() * 500)

        app.triangle.setKey('$x', e.x - Math.random() * 500)
        app.triangle.setKey('$y', e.y + Math.random() * 250)
      }
    }
  },
  rectangle: {
    $x: {
      $val: 400,
      $animation: {
        $duration: 16,
        $start: -1000
      }
    },
    $y: {
      $val: 600,
      $animation: {
        $duration: 18
      }
    }
  },
  triangle: {
    $x: {
      $val: 700,
      $animation: {
        $duration: 38
      }
    },
    $y: {
      $val: 100,
      $animation: {
        $duration: 6
      }
    }
  }
})