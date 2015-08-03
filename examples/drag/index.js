require( './style.less' )

var app         = require( '../../lib/app' )
var Element     = require( '../../lib/element' )
var Observable  = require('vjs/lib/observable')

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/backgroundImage' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/size' )
)


// debugger


var customImage = new Observable({
  $val: "../../test/properties/1.png"
})

window.thing = thing = new Element({
  $backgroundImage:{
    $val: customImage,
    $size: "100px",
    $on:{
      $error:function (argument) {
        this.$loadError = "error"
      }
    }
  },
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
  $x: null,
  $y: null,
  span: {
    $node: 'span',
    $text: 'Drag Me!'
  }
})

app.set( {
  a: new thing.$Constructor({
  })
} )