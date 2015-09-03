require('./style.less')

var app = require( '../../lib/app' )
var Icon = require('../../lib/components/icon')

var arr = ['cloud','sun','twister']

app.set({
  one: new Icon({
  	$val:'cloud'
  }),
  two: new Icon('sun'),
  three: new Icon('twister')
})

setInterval(function(){
	app.each(function(property){
		property.$val = arr[~~(Math.random()*3)]
	})
},2000)