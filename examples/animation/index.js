 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/backgroundcolor' ),
  require( '../../lib/property/draggable' )
)

var asd

var thing = window.thing = new Element( {
  $css: 'hello test',
  $on: {
    $click: function () {
      var that = this;

      function anim () {
        var x = this.$x && this.$x.val || 0
        var y = this.$y && this.$y.val || 0

        that.set({
          $x: x + 1,
          $y: y + 1
        })

        requestAnimationFrame(anim)
      }

      asd = requestAnimationFrame(anim)

    }
  }
})

app.set( {
  hello: new thing.$Constructor()
})
