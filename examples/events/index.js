require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( 'vjs/lib/methods/lookUp' )
)


var thing = new Element( {
  // $on: {
  //   mousedown:function(){
  //     console.log('DOWN ON TOP')
  //   }
  // },
  $key:'balls',
  $text: 'balls',
  $css: {
    $val: 'grey-bg',
    $add: ' red-txt '
  },
  // $on:{
  //   $down:function(){
  //     console.error('GVD')
  //   }
  // },
  twerp:{
    $text:'no way!',
    // $on:{
    //   $down:function(){
    //     console.error('GVD')
    //   }
    // }
  }
} )


app.set( {
  a: new thing.$Constructor({

  }),
  b: new thing.$Constructor({
    $text:'I shouuld say twerp!',
    $on:{
      $drag:function(){
        console.error('twerp')
      } 
    }
  })
} )

console.log('thing.$on.$down',thing.$on.$down)
console.log('thing.$on.mousedown',thing.$on.mousedown)
console.log('------------')
console.log('app.a.$on.$down',app.a.$on.$down)
console.log('app.a.$on.mousedown',app.a.$on.mousedown)
console.log('------------')
console.log('app.b.$on.$down',app.b.$on.$down)
console.log('app.b.$on.mousedown',app.b.$on.mousedown)
// console.log('------------')
// console.log('thing.twerp.$on.$down',thing.twerp.$on.$down)
// console.log('thing.twerp.$on.mousedown',thing.twerp.$on.mousedown)
// console.log('------------')
// console.log('app.a.twerp.$on.$down',app.a.twerp.$on.$down)
// console.log('app.a.twerp.$on.mousedown',app.a.twerp.$on.mousedown)