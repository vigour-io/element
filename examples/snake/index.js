require('./style.less')
var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )
var Property = require('../../lib/property')
Property.prototype.inject( require('../../lib/animation') )

var mouse = new Property({
  x: 0,
  y: 0
})

var thing = new Element({
  $inject: [
    require( '../../lib/property/size' ),
    require( '../../lib/property/transform' )
  ],
  $width: 20,
  $height: 20
})

thing.$node.style.position = 'absolute';

var Img = new Element({
  $background: {
    $inject: require('../../lib/property/background/position')
  }
}).$Constructor

var holder = new Element({})

for(var i = 0 ; i < 100; i ++) {
  var t = new thing.$Constructor({
    $define: {
      i: i
    },
    $y: {
      $val: mouse.y,
      $add: function() {
        return Math.sin( this.$parent.i / 10 + mouse.y.$val/20 )*(mouse.y.$val)
      },
      $animation: {
        $duration: 200
      }
    },
    $scale: i*0.01+1,
    $x: {
      $val: mouse.x,
      $add: function() {
        return Math.cos( this.$parent.i / 20 + mouse.x.$val/200 )* 300+ 150
      },
      $animation: {
        $duration: i / 5
      }
    }
  })
  holder.setKey(i, t)
}

app.set({
  holder: holder
})

app.set({
  holder: holder,
  $on: {
    $move: function (event, e) {
      mouse.x.$val = e.pageX
      mouse.y.$val = e.pageY
    },
    $down: function (event, e) {
      mouse.x.$val = e.pageX
      mouse.y.$val = e.pageY
    }
  }
})