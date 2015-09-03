require('./style.less')

var app = require('../../lib/app')
var dictionary = window.dictionary = require('../../lib/dictionary')
var Element = require('../../lib/element')

dictionary.set( require('./en.json') )

Element.prototype.inject( require('../../lib/dictionary/text') )

app.set({
  test:{
    $text:'message.success'
  }
})

// app.test.$text.$val = 'message.error'