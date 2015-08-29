/**
 * A **property** is inherited from observable objects, the Idea of properties is
 * define a property inside an Element whitout touch in the Element node.
 * @namespace Property
 */
"use strict";
var Observable = require('vjs/lib/observable')

Observable.prototype.inject(
	require('../cases/inject'),
	require('vjs/lib/operator/add'),
	require('vjs/lib/operator/multiply'),
	require('vjs/lib/operator/transform'),
	require('../animation')
)

module.exports = new Observable({
	// $inject: [
	// 	// require('../cases/inject')
	// // 	require('vjs/lib/operator/add'),
	// // 	require('vjs/lib/operator/multiply'),
	// // 	require('vjs/lib/operator/transform'),
	// //   require('../animation')
	// ],
	$ChildConstructor: '$Constructor'
}).$Constructor
