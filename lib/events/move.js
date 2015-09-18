"use strict";

var BasicEventEmitter = require('./basic')

exports.$inject = require('./')

exports.$on = {
  $flags: {
  	$move:new BasicEventEmitter({
  		$type:{
  			$val:'mousemove',
  			$touch:'touchmove'
  		}
		})
  }
}