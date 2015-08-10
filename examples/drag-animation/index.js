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
  $on: {
    $down: function(event, e) {
      this.$removeClass('return')
      this.startX = e.x
      this.startY = e.y
      console.log(this.startX, this.startY)
    },
    // $drag: function(event, e) {
    //   this.set({
    //     $scale: e.x / 400,
    //   })
    // },
    'mouseup': function() {
      this.$addClass('return')
      this.$x.$val = this.startX
      this.$y.$val = this.startY
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
