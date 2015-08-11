 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/draggable' )
)

var thing = window.thing = new Element( {
  $draggable: true,
  $on: {
    $dragstart: function(event, e) {
      this.set ({
        $css: {
          $removeClass: 'move'
        }
      })
    },

    $dragend:function( event, e ){
      this.set({
        $x: event.startX,
        $y: event.startY,
        $css: {
          $addClass: 'move toRight'
        }
      })
    },

    $transitionEnd: function (event) {
      console.info('transitionEnd', event)
    }
  }
})

app.set( {
  hello: new thing.$Constructor()
})
