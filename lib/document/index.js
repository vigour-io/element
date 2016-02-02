'use strict'
var Observable = require('vigour-js/lib/observable')
var documentElement = document.documentElement
module.exports = documentElement.base || (documentElement.base = new Observable())

// has to be replaced ITS DOME DELEGATOR NOW
