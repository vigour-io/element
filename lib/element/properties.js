"use strict";

var Observable = require('vjs/lib/observable')

//TODO: is this the best way for inject?
module.exports = exports = function( prototype ){
  var flags = prototype.$flags
  for (var field in exports) {
    exports[field] = new Observable({
      $useVal:true,
      $on: {
        $change:exports[field]
      }
    })
    var property = exports[field]
    flags[field] = returnFn(field, property)
  }
}

function returnFn(field, property){
  return function(val, event) {
    if(!this[field]) {
      this.$setKeyInternal( field, new property.$Constructor(), false)
    }
    // //TODO: event moet hier
    this[field].$set(val)
  }
}

exports = {
  $css:function( event ) {
    var node = this.$parent.$node
    var className = this.$parent.$node.className
    node.className = this.$val
  },
  $border:function( event ) {
    this.$parent.$node.style.border = this.$val
  },
  $text:function( event ) { //don't replace the entire
    var node = this.$parent.$node
    var nodes = node.childNodes
    var v = this.$val || ''

    if(v instanceof Object) v = ''

    if (/text/.test(node.type)) {
      node.value = v;
      return;
    }

    if (nodes) {
      for (var i = 0, l = nodes.length; i < l; i++) {
        if (nodes[i].nodeType === 3) {
          // console.log('BLABLA'.inverse,v)
          nodes[i].nodeValue = v;
          return;
        }
      }
    }
    node.appendChild(document.createTextNode(v));
  }
}