require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/size' ),
  require( '../../lib/property/scroll/top' ),
  require( '../../lib/property/transform' )
)

var Bla = new Element({
  $width: 200,
  $height:200,
}).$Constructor

var thing = new Element({
  $height: 300,
  scroller:new Element({
    one:new Bla(),
    two:new Bla(),
    three:new Bla(),
    four:new Bla(),
    five:new Bla(),
    six:new Bla()
  })
})

var holder = new Element({
  $scrollTop:{
    $val:0,
    $animation:{
      $duration:36
    }
  }
})

var chooser = new Element({})
var colors = ['yellow', 'orange', 'blue', 'lilac', 'pink', 'red']

for(var i = 0 ; i < colors.length; i=i+1) {
  var n = new thing.$Constructor({
    $scrollLeft:true//,
    // topbar:{
    //   $style:{
    //     position:{
    //       $val:holder.$scrollTop,
    //       $transform:function(val){
    //         var node = this.$parent.$parent.$node
    //         return node.offsetTop - val <= 0 ? 'fixed' : 'absolute'
    //       }
    //       // $val:Math.random() >= 0.5 ? 'fixed' : 'absolute'
    //     }
    //   }
    // }
  })
  var m = new Element({
    $define: {
      i: i*300
    },
    $on: {
      $click: function (ev, event) {
        app.holder.setKey('$scrollTop', this.i)
      }
    }
  })
  holder.setKey(colors[i], n)
  chooser.setKey(colors[i], m)
}

app.set({
  holder: holder,
  chooser: chooser,
  arrow:{
    $y:{
      $val:holder.$scrollTop,
      $transform:function( val ){
        var b = document.body
        return val * b.offsetHeight/b.scrollHeight/2
      }
    }
  }
})