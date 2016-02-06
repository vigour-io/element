'use strict'
var Element = require('./element')
var element = Element.prototype
var Operator = require('vigour-js/lib/operator')
Operator.prototype.inject(require('./element/map'))
Operator.prototype.properties = {
  isOperator: { val: true },
  isProp: { val: true }
}
// by default inject all functionalities
// if people want mroe specific they can require it from the lib
element.inject(
  require('./property/text'),
  require('./property/css'),
  require('./property/html'),
  require('./property/attributes'),
  require('./property/transition'),
  require('./property/position'),
  require('./property/flex'),
  require('./property/src'),
  require('./property/size'),
  require('./property/transform'),
  require('./property/display'),
  require('./property/opacity'),
  require('./property/value'),
  require('./property/misc'),
  require('./event'),
  require('./event/down'),
  require('./event/up'),
  require('./event/move'),
  require('vigour-js/lib/methods/tostring')
)

element.set({
  css: {}
})

module.exports = Element

