'use strict'
var Element = require('../element')
Element.prototype.inject(require('../engine/dom/element'))
var App = require('../engine/dom')
module.exports = global.app = new App({
  prerendered: true, // not allways!
  node: document.body // ugh annoying fix later
})
// make prerendered on a certain event
