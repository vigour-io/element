require('./style.less')

var app = require('../../lib/app')

var Element = require('../../lib/element')

Element.prototype.inject( require('../../lib/dictionary/inject') )

app.set({
  test:{
    $text:'translation.test'
  }
})