require('./style.less')

var app = require('../../lib/app')
var dictionary = window.dictionary = require('../../lib/dictionary')
var Element = require('../../lib/element')
var Observable = require('vigour-js/lib/observable')
var en = require('./en.json')
var nl = require('./nl.json')
var toggle = true
dictionary.set(en)

Element.prototype.inject(require('../../lib/property/text'))
Observable.prototype.inject(require('../../lib/dictionary/inject'))

app.set({
  test: {
    text: {
      dictionary: 'message.success',
      transform: [
        function (val) {
          return 'balls'
        },
        function (val) {
          return 'smalls'
        }
      ],
      add: ['1', '2', '3', '4', '5']
    }
  }
})

setInterval(function () {
  dictionary.set(toggle ? nl : en)
  toggle = !toggle
}, 1000)
