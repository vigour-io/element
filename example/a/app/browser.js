'use strict'
var Element = require('../../../lib/element')
Element.prototype.inject(require('../../../lib/engine/dom/element'))
var App = require('../../../lib/engine/dom')
require('../style.less')
module.exports = global.app = new App({
  prerendered: true,
  node: document.body
})

// make prerendered on a certain event
