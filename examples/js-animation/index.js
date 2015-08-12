 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' )
)

var thing = window.thing = new Element( {
  $css : "teste",
  $x:{
    $animation:{
      whatevs:true,
      smurt:10
    }
  }
})

app.set( {
  hello: new thing.$Constructor(),
  $on:{
    $click:function(event, e){
      this.hello.$x.$val = e.x - 105
    }
  }
})
