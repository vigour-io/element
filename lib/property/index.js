/**
 * A **property** is inherited from observable objects, the Idea of properties is
 * define a property inside an Element whitout touch in the Element node.
 * @namespace Property
 */
"use strict";

var Observable = require('vjs/lib/observable')
var Event = require('vjs/lib/event')
var set = Observable.prototype.set

Observable.prototype.inject(
	require('vjs/lib/operator/add'),
	require('vjs/lib/operator/transform'),
  require('../cases/inject'),
  require('../animation')
)

module.exports = Observable
