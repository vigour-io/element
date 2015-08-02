"use strict";

var Property = require('./')
var setKeyInternal = Property.prototype.setKeyInternal

exports.$flags = {
  $attributes: new Property({
    $define: {
      setKeyInternal: function( key, val, property, event, nocontext ) {
        var ret = setKeyInternal.call( this, key, void 0, property, event, nocontext )
        if(!this[key].$on || !this[key].$on.$change) {
          this[key].on('$change', function(event, removed) {
            var node = this.$parent.$parent.$node
            if( removed === true ) {
              node.removeAttribute( key )
            } else {
              node.setAttribute( key, this.$val )
            }
          })
        }
        this[key].$val = val
        //a listener that updates parent or myself
        return ret
      }
    }
  })
}