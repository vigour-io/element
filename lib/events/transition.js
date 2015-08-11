"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var stamp = 0

module.exports = new Emitter( {
  $define: {
    $noInstances: true,
    $generateConstructor: function() {
      return function DerivedEmitter( val, ev, parent, key ) {
        var set = {}
        var id = ++stamp + 'transition'
        var app = document.body.$base

        set[ id ] = function( event, e ) {

          var _this = this

          app.on('$transitionEnd', function(event, e){
            _this.$emit( key, event, e )
          },id)
        }

        return Emitter.apply( this, arguments )
      }
    }
  }
})