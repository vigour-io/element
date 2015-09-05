require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/size' ),
  require( '../../lib/property/scroll/top' ),
  require( '../../lib/property/transform' )
)

var thing = new Element({
  $height: 300
})

var holder = new Element({
  $scrollTop:{
    $val:0,
    $animation:{
      $duration:24
    }
  }
})

var chooser = new Element({})
var colors = ['yellow', 'orange', 'blue', 'lilac', 'pink']

for(var i = 0 ; i < 5; i=i+1) {
  var n = new thing.$Constructor()
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
  $scrollTop: {
    $val: 0,
    $animation: {
      $duration: 16
    }
  }
})

document.body.addEventListener('touchstart',function(e){
  e.preventDefault()
},false)

app.set({
  arrow:{
    $y:{
      $val:app.holder.$scrollTop,
      $transform:function( val ){
        var b = document.body
        return val * b.offsetHeight/b.scrollHeight
      }
    }
  }
})