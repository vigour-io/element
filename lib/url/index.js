"use strict"

var isNode = require('vigour-js/lib/util/is/node')
var Observable = require('vigour-js/lib/observable')

window.onpopstate = function(event) {
  console.log("pathname: " + location.pathname)
}

exports.buildUrl = function (val) {
  // var href = window.location.href
  window.history.pushState({}, val, val.replace(/ /g, '+').toLowerCase() )
}

exports.parseUrl = function (str) {
  var url = (isNode ? require('url') : null)
  if (isNode) {
    return url.parse(str);
  }
  else {
    url = document.createElement('a')
    url.href = str
    return url
  }
}
