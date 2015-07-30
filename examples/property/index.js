require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/size' )
)

var thing = new Element({
  $on: {
    $click:function(){
      // console.time('transform, move and dim')
      var x = ~~(Math.random() * 200)
      var y = ~~(Math.random() * 200)

      this.$y.$val = y
      this.$x.$val = x
      // console.info('move that thing!', x, y)

      this.$opacity.$val = Math.random() * 2
      // console.info('make it dim!', this.$opacity.$val)

      this.$width.$val = ~~(Math.random() * 400)
      this.$height.$val = ~~(Math.random() * 400)
      // console.info('change sizes!', x, y)
      // console.timeEnd('transform, move and dim')
    }
  },
  $x: null,
  $y: null,
  $opacity: null,
  $width: null,
  $height: null,
  $key:'balls',
  $text: 'balls'
})

app.set( {
  a: new thing.$Constructor({
  })
} )