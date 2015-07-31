require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/size' )
)

window.thing = thing = new Element({
  $text:'??',
  $on: {
    $click: function(){

    },
    $down: function(event, e){
      var rect = this.$node.getBoundingClientRect()
      this.pageX = e.pageX
      this.pageY = e.pageY
      this.startX = rect.left
      this.startY = rect.top
    },
    $drag:function(event, e){
      var x = this.startX + (e.pageX - this.pageX)
      var y = this.startY + (e.pageY - this.pageY)
      this.$x.$val = x
      this.$y.$val = y
      this.$text.$val = x + ' , ' + y
      this.$node.style.opacity = 1 - x / window.innerWidth
    }
  },
  $x: 1,
  $y: 1
  // span: {
  //   $node: 'span',
  //   $text: 'Drag Me!'
  // }
})

// //if id === 3
// thing.$on.setKey('$down',{
//   3:function( event, e ) {
//     var _this = this
//     app.on('$move',function( event, e ){
//       _this.$emit( key, event, e )
//     },3)

//     app.on('$up',function(){
//       app.off('$move',3)
//       app.off('$up',3)
//     },3)
//   }
// })

app.set( {
  a: new thing.$Constructor()
} )

