"use strict";

var BasicEventEmitter = require('./basic')

exports.$inject = require('./')

exports.$on = {
  $flags: {
  	$up:new BasicEventEmitter({
  		$type:{
  			$val:'mouseup',
  			$touch:'touchend'
  		}
		})
  }
}