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
  $css: 'hello',
  $on: {
    $down: function(event, e) {
      this.$css.removeClass('move')

      this.startX = e.x - e.offsetX
      this.startY = e.y - e.offsetY
    },

    $click: function (event, e) {
      this.$css.toggleClass('blue')
    },
    'mouseup': function() {
      this.$css.addClass('move')
      this.set({
        // $css:{
        //   addClass:'move'
        // },
        $x: this.startX,
        $y: this.startY,
        $scale: 1
      })
    }
  }
})

app.set( {
  hello: new thing.$Constructor(),
  // $on: {
  //   $scroll: function (event, e) {
  //     event.preventDefault()
  //   }
  // }
})
