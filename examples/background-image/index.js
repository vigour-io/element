require('./style.less')
var app 				= require( '../../lib/app' )
var Element 		= require( '../../lib/element' )


Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/attributes' ),
  require( '../../lib/property/backgroundImage' ),
  require( '../../lib/property/backgroundColor' )
)

var element =  new Element({
	$css:"active",
	$backgroundImage:'http://wallpaper.ultradownloads.com.br/45586_Papel-de-Parede-Filhote-de-Cachorro_1024x768.jpg'
})


element.$backgroundImage.remove()

app.set({
	a: new element.$Constructor({})
})