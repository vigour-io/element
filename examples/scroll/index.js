require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/size' )
)

var thing = new Element({
  $height: 700
})

var holder = new Element({})
var colors = ['red', 'yellow', 'orange', 'blue', 'lilac']

for(var i = 0 ; i < 5; i=i+1) {
  var t = new thing.$Constructor()

  holder.setKey(colors[i], t)
}

app.set({
  holder: holder
})