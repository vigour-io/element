require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/transform' )
)

var thing = new Element({
  $on: {
    $click:function(){
      var x = ~~(Math.random() * 200)
      var y = ~~(Math.random() * 200)

      this.$x.$val = x
      this.$y.$val = y
      console.log('move that thing!', x, y)

      this.$opacity.$val = Math.random()
      console.log('make it dim!', x, y)
    }
  },
  $x:200,
  $y:200,
  $opacity: 1,
  $key:'balls',
  $text: 'balls'
})

app.set( {
  a: new thing.$Constructor({
  })
} )