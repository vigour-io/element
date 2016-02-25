'use strict'
var Element = require('./element')
var element = Element.prototype
var Operator = require('vigour-observable/lib/operator')
Operator.prototype.inject(require('./element/map'))
Operator.prototype.properties = {
  isOperator: { val: true },
  isProp: { val: true }
}

require('./cases')
// by default inject all functionalities
// if people want mroe specific they can require it from the lib
element.inject(
  require('./on/remove'),
  require('./property/text'),
  require('./property/css'),
  require('./property/html'),
  require('./property/background'),
  require('./property/attributes'),
  require('./property/transition'),
  require('./property/position'),
  require('./property/flex'),
  require('./property/src'),
  require('./property/size'),
  require('./property/transform'),
  require('./property/order'),
  require('./property/display'),
  require('./property/opacity'),
  require('./property/value'),
  require('./event'),
  require('./event/click'),
  require('./event/down'),
  require('./event/up'),
  require('./event/move'),
  require('./property/focus'),
  require('./property/length')
)

module.exports = Element
