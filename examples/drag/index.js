require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/size' )
)

window.thing = thing = new Element({
  $on: {
    $down: function(event, e){
      var rect = this.$node.getBoundingClientRect()
      this.startX = rect.left
      this.startY = rect.top
    },

    $grab: function(event, e){
      this.$x.$val = e.x - 100 //- this.startX
      this.$y.$val = e.y - 100 //- this.startY
    }
  },
  $x: 1,
  $y: 1,
  span: {
    $node: 'span',
    $text: 'Drag Me!'
  }
})

app.set( {
  a: new thing.$Constructor({
  })
} )