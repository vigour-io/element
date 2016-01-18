'use strict'
var Element = require('../element')
Element.prototype.inject(require('../engine/dom/element'))
var Observable = require('vigour-js/lib/observable')
var App = require('../engine/dom')

module.exports = global.app = new App({
  // key: 'app',
  properties: {
    focused: Observable
  },
  prerendered: true, // not allways!
  node: document.body // ugh annoying fix later
})
// make prerendered on a certain event


// fix the last bit