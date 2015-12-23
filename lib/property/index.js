'use strict'

/**
 * A **property** is inherited from observable objects, the Idea of properties is
 * define a property inside an Element whitout touch in the Element node.
 * @namespace Property
 */
var Observable = require('vigour-js/lib/observable')

Observable.prototype.inject(
  require('../cases/inject'),
  require('vigour-js/lib/operator/add'),
  require('vigour-js/lib/methods/lookUp'),
  require('vigour-js/lib/operator/transform'),
  require('vigour-js/lib/operator/subscribe'),
  require('../animation')
)

module.exports = new Observable({
  // inject: [
  //   require('../cases/inject'),
  //   require('vigour-js/lib/operator/add'),
  //   require('vigour-js/lib/methods/lookUp'),
  //   require('vigour-js/lib/operator/transform'),
  //   require('vigour-js/lib/operator/subscribe'),
  //   require('../animation')
  // ],
  ChildConstructor: 'Constructor'
}).Constructor
