 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/transform' )
)

var thing = window.thing = new Element( {
  $css : "teste",
  $x:{
    $animation:{
      time:60
    }
  },
  $y:{
    $animation:{
      time:30
    }
  }
})

app.set( {
  hello: new thing.$Constructor(),
  $on:{
    $click:function(event, e){
      this.hello.$x.$val = {$val: e.x, $add:-110}
      this.hello.$y.$val = {$val: e.y, $add:-110}
    }
  }
})
