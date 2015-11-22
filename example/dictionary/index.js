require('./style.less')

var dictionary = window.dictionary = require('../../lib/dictionary')
var App = require('../../lib/app')
var Element = require('../../lib/element')
var Observable = require('vigour-js/lib/observable')
var en = require('./en.json')
var nl = require('./nl.json')
var toggle = true
dictionary.set(en)

Element.prototype.inject(require('../../lib/property/text'))
Observable.prototype.inject(require('../../lib/dictionary/inject'))

var app = new App({
  node:document.body,
  test: {
    text: {
      $dictionary: 'message.success'
    }
  }
})

setInterval(function () {
  dictionary.set(toggle ? nl : en)
  toggle = !toggle
}, 1000)
