require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( 'vjs/lib/methods/lookUp' )
)

var thing = new Element( {
  $on:{
    mousedown:function(){
      console.log('DOWN ON TOP')
    }
  },
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
          // $down:function( event, e ){
          //   console.log('$down!', event, e)
          // },
          // $move:function( event, e ){
          //   console.log('$move!', event, e)
          // },
          // $up:function(event,e){
          //   console.log('$up!', event, e)
          // },
          // $drag:function(event,e){
          //   console.log('$drag!', event, e)
          // },
          // $click:function( event, e ){
          //   console.log('$click!', event, e)
          // }
          // mousedown:function(){
          //   var id = '$click'
          //   this.$addEvent('mouseup',function(){
          //     //do something click!

          //     this.$removeEvent(false,id)
          //   },id)
          // }
          mousedown:function(event, e){
            console.log('DEEPER DOWN')
          }
          // $dragend:function(e){

          // },
          // $dragstart:function(e){

          // }
          // mousedown:function(){
          //   var id = 'drag'
            
          //   this.$addEvent( 'mousemove', function(e){
          //     console.log('dragging!!!')
          //   },id)

          //   this.$addEvent( 'mouseup', function(e){
          //     console.error('drag end')


          //     this.$removeEvent( false, id )

          //   },id)
          // }
        },
        title:{
          $text:'click me!'
        }
      }
    }
  }
} )

app.$set( {
  a: new thing.$Constructor({
    // one:{
    //   two:{
    //     three:{
    //       $drag:function(){
    //         console.log('weeehooooo')
    //       }
    //     }
    //   }
    // }
  })
} )
