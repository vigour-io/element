'use strict'
var Element = require('./element')
var element = Element.prototype

element.inject(
  require('./property/text'),
  require('./property/css')
)

element.set({ css: '' })

module.exports = Element

