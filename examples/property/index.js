require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/draggable' ),
  require( '../../lib/property/size' )
)

window.thing = thing = new Element({
  $text:'??',
  // $draggable:{x:true}
})

app.set({
  a: new thing.$Constructor({
    $text:'>>>'
  })
})

app.set({
  $draggable:{
    // x:function(){
    //   return app.a.$text
    // },
    bind:function(){
      return this.a
    }
  }
})