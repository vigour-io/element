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
  one: {
    $css: 'grey-bg',
    $text: 'smalls',
    two: {
      $css: 'grey-bg',
      $text: 'falls', 
      three: {
        $css: 'grey-bg',
        $text: 'walls',
        $on: {
          $drag:function(event, e){
            console.log('DEEPER DOWN')
          }
        },
        title:{
          $text:'click me!'
        }
      }
    }
  }
} )


app.set( {
  a: new thing.$Constructor({
  })
} )