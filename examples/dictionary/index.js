require('./style.less')

var app = require('../../lib/app')
var dictionary = window.dictionary = require('../../lib/dictionary')
var Element = require('../../lib/element')
var Observable = require('vjs/lib/observable')

dictionary.set( require('./en.json') )
Observable.prototype.inject( require('../../lib/dictionary/text') )
Element.prototype.inject( require('../../lib/property/text') )

app.set({
  test:{
    $text:{
    	$dictionary:'message.success',
    	$add:{
    		$dictionary:'message.error'
    	}
    }
  }
})