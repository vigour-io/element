"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var stamp = 0

module.exports =  new Emitter( {
  $define: {
    $generateConstructor: function() {
      return function DerivedEmitter( val, ev, parent, key ) {
        var set = {}
        var id = ++stamp + 'scroll'
        var app = document.body.$base
        
        set[ id ] = function( event, e ) {
          this.$emit( key, event, e )
          
          app.on('$up',function( event, e ){
            _this.$emit( key, event, e )
            app.off('$up',id)
          },id)

        } 

        parent.setKey( 'scroll', set, ev )
        return Emitter.apply( this, arguments )
      }
    }
  }
} )