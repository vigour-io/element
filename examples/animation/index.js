 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/transform' )
)

var thing = window.thing = new Element( {
  $x: 100,
  $y: 300,

  // animation by settings
  $animation: {
    $x: 500,
    $y: 600,
    $opacity: 0.2,
    $time: 600,
    $callback: function () {
      // body...
    }
  },

  // built-in animation
  // $animation: $fadeIn(duration, callback),

  // custon animation
  $animation: function () {
    var $node = this.$node
    // body...
  }
})

app.set( {
  hello: new thing.$Constructor(),
  $on:{
    $click:function(event, e){
      this.hello.$x.$val = {$val: e.x, $add:-110}
      // this.hello.$y.$val = {$val: e.y, $add:-110}
    }
  }
})
