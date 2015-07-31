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
    // $click:function(){
    //   // console.time('transform, move and dim')
    //   var x = ~~(Math.random() * 200)
    //   var y = ~~(Math.random() * 200)

    //   this.$y.$val = y
    //   this.$x.$val = x
    //   // console.info('move that thing!', x, y)

    //   this.$opacity.$val = Math.random() * 2
    //   // console.info('make it dim!', this.$opacity.$val)

    //   this.$width.$val = ~~(Math.random() * 400)
    //   this.$height.$val = ~~(Math.random() * 400)
    //   // console.info('change sizes!', x, y)
    //   // console.timeEnd('transform, move and dim')
    // }
    $down:function(event, e){
      var rect = this.$node.getBoundingClientRect()
      this.startY = e.pageY - rect.left// - (this.$y.$val || 0)
      this.startX = e.pageX - rect.top// - (this.$x.$val || 0)

      console.log('??',(this.$x.$val || 0))
    },
    $grab:function(event, e){
      console.log('set x',e.pageX, '-', this.startX,e.pageX - this.startX)
      this.$x.$val = e.pageX - this.startX
      this.$y.$val = e.pageY - this.startY
    }
  },
  $x: 1,
  $y: 1,
  // $opacity: null,
  // $width: null,
  // $height: null,
  // $key:'balls',
  $text: 'balls'
})

app.set( {
  a: new thing.$Constructor({
  })
} )