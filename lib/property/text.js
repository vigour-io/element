"use strict";

var Property = require('./')

exports.$flags = {
  /**
   * Use $text to specify a text to an element
   * @function $text
   * @memberOf Property
   * 
   * @example
   * var a = new Element({
   *   $text : {
   *     $val:"some text"
   *   }
   * })
   * 
   */
  $text: new Property({
    $on: {
      $change: function( event ) {
        console.log('text!',this.$val)
        var node = this.$parent.$node
        var nodes = node.childNodes
        var v = this.$val || ''

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

        node.appendChild(document.createTextNode(v))
      }
    }
  }).$Constructor
}