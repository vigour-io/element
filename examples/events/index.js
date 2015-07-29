require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( 'vjs/lib/methods/lookUp' )
)

var thing = new Element( {
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
        $node:'button',
        $on: {
          $drag:function(){
            
          }
          // $down:function(){
          //   console.error('down!!')
          // },
          // $move:function(){
          //   console.error('move!!')
          // },
          // $up:function(){
          //   console.error('up!!')
          // },
          // mousedown:function(){
          //   console.log( 'HEYYYY' )
          //   var id = 'click'
          //   this.$addEvent( 'mouseup', function(e){
          //     console.error('UPPPPP')
          //     // this.$removeEvent( false,id )
          //   },id)
          // }
        }
      }
    }
  }
} )

// thing.$addEvent('mouseup','first')

app.$set( {
  // b: new thing.$Constructor( {
  //   $text: '?!@#234234234234!@#',
  //   c: new thing.$Constructor( {
  //     flups: new thing.$Constructor( {
  //       $text: 'HIERO',
  //       $css: 'blue-bg'
  //     } )
  //   } )
  // } ),
  a: new thing.$Constructor()
} )


// console.log('RESULTS',app.b.c.flups.$addEvent)
console.log( app.a.one.two.three.$on.$val )

function click( event, e ) {

  // event.$postponed = null

  // this.$text.$val = Math.random()*9999
  // this.$node.style.opacity = Math.random()

  console.error('???', this._$key,this.$path,this.$node)
  this.remove()
}
