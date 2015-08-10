"use strict";

var ua = require('../ua')

exports.transform = function(str) {
  console.log(ua, str)

  if(ua.prefix === 'webkit') {
    this.$node.style.WebkitTransform = str
  }
  else if(ua.prefix === 'Moz') {
    this.$node.style.MozTransform = str
  }
  else if(ua.prefix === 'ie') {
    this.$node.style.msTransform = str
  }
  else if(ua.prefix === 'opera') {
    this.$node.style.OTransform = str
  }
  else {
    this.$node.style.transform = str
  }
}