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

var Img = new Element({
  $background: {
    $inject: require('../../lib/property/background/position')
  }
}).$Constructor

var holder = new Element({})

for(var i = 0 ; i < 500; i ++) {
  var t = new thing.$Constructor({
    $x: {
      $val: mouse.x,
      $animation: {
        $duration: i / 16
      }
    }
  })
  holder.setKey(i, t)
}

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
