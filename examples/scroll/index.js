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

function roll( scroll, delta ){
  scroll.$rafId = window.requestAnimationFrame(function(){
    delta = delta/1.1
    scroll.set(scroll.$val - delta)
    if(Math.abs(delta) > 1){
      roll( scroll, delta )
    }else{
      scroll.setKey( '$dragging', false )
    }
  })
}

var holder = new Element({
  $scrollTop: {
    $val: 0,
    $animation: {
      $duration: 16
    }
  },
  $on:{
    touchstart:function( event, e ){
      e.preventDefault()
      this._prev = e.y
      this.$scrollTop.setKey( '$dragging', true )
      window.cancelAnimationFrame( this.$scrollTop.$rafId )
    },
    touchmove:function( event, e ){
      e.preventDefault()
      var d = ( e.y - this._prev )
      this.$scrollTop.$val -= d
      this._delta = d
      this._prev = e.y
    },
    touchend:function( event, e ){
      var $scrollTop = this.$scrollTop
      var d = this._delta
      this._delta = 0
      roll($scrollTop,d)
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
  e.preventDefault();
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