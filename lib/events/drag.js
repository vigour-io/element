"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var stamp = 0

module.exports = new Emitter( {
  $define: {
    $noInstances: true,
    $generateConstructor: function() {
      return function DerivedEmitter( val, ev, parent, key ) {
        var set = {}
        var id = ++stamp + 'drag'
        var app = document.body.$base

        set[ id ] = function( event, e ) {
          var _this = this
          app.on('$move',function( event, e ){
            _this.$emit( key, event, e )
          },id)

          app.on('$up',function(){
            app.off('$move',id)
            app.off('$up',id)
          },id)
        }

        parent.setKey('$down', set, ev)
        return Emitter.apply( this, arguments )
      }
    }
  }
})