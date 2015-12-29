'use strict'
var ua = require('vigour-ua')
// when node do something else-- e.g. emulate choose a defualt
ua(window.navigator.userAgent, exports)
