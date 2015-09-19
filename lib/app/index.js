"use strict";

//require('./style.less')

var Element = require('../../lib/element')
var Observable = require('vjs/lib/observable')
var app = module.exports = new Element({
  $key:'app',
  $node: document.body,
  $flags:{
  	$width:Observable,
  	$height:Observable
  },
  $rendered:true
})

;(window.onresize = function(){
	var w = window.innerWidth
	var h = window.innerHeight
	app.set({
		$width:w,
		$height:h
	})
})()