'use strict'
var ua = require('vigour-ua')
// when node do something else-- e.g. emulate choose a defualt
// ua(global.navigator.userAgent, exports)
var isNode = require('vigour-js/lib/util/is/node')

if (isNode) {
  ua.platform = 'node'
} else {
  ua(global.navigator.userAgent, exports)
}
