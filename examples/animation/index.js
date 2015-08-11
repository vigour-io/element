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
  $css: 'hello test',
  $on: {
    $dragstart: function(event, e) {
      this.set ({
        $css: {
          $removeClass: 'move'
        }
      })
    },

    $click: function () {
      this.set ({
        $css: {
          $toggleClass: 'toggle test'
        }
      })
    },

    $dragend:function( event, e ){
      this.set({
        $x: event.startX,
        $y: event.startY,
        $css: {
          $addClass: 'move'
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
