 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/draggable' )
)

var thing = window.thing = new Element( {
  // $css: 'my-own-hello',=
  $draggable: true,
  $on: {
    $drag: function(event, e) {
      this.set({
        $rotate: e.y,
        $scale: e.x / 500,
      })
    }
  }
})

app.set( {
  hello: new thing.$Constructor(),
  $draggable: {
    bind: function(){
      return this.hello
    }
  },
  $on: {
    $scroll: function (event, e) {
      console.log(event)
      event.preventDefault()
    }
  }
})
