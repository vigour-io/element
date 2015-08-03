"use strict";

var Property = require('./')

exports.$flags = {
  $text: new Property({
    $on: {
      $change: function( event ) {
        var node = this.$parent.$node
        var nodes = node.childNodes
        var v = this.$val || ''

        console.log('HA!',v)

        if(v instanceof Object){
          v = ''
        }

        if (/text/.test(node.type)) {
          node.value = v;
          return;
        }

        if (nodes) {
          for (var i = 0, l = nodes.length; i < l; i++) {
            node = nodes[i]
            if (node.nodeType === 3) {
              node.nodeValue = v;
              return;
            }
          }
        }

        console.log('text is now: ',v)
        node.appendChild(document.createTextNode(v))
      }
    }
  })
}