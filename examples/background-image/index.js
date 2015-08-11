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

var element = new Element({
	$css:"active",
	$backgroundImage:'http://wallpaper.ultradownloads.com.br/45586_Papel-de-Parede-Filhote-de-Cachorro_1024x768.jpg'
})


var a = new element.$Constructor({

})

app.set({
	q:element,
	a:a
})

// console.log(a)

// not work
// a.$backgroundImage.$val = "whatever"


// a.set({
// 	$backgroundImage: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSWzoOZjb0UQ-A3EoHuiYuzCcY0BNDEyNERtlu8BKgOx6tQB-DTjrjzZF0"
// })
console.log('......')
a.$backgroundImage.$val = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSWzoOZjb0UQ-A3EoHuiYuzCcY0BNDEyNERtlu8BKgOx6tQB-DTjrjzZF0"
