"use strict"
var isNode = require('vigour-js/lib/util/is/node')

window.onpopstate = function(event) {
  console.log("pathname: " + location.pathname)
}

exports.buildUrl = function (val) {
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
