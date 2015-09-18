"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var stamp = 0

exports.$on = {
  $flags: {
    $drag:new Emitter( {
      $define: {
        $instances: false,
        $generateConstructor: function() {
          return function DerivedEmitter( val, ev, parent, key ) {
            var set = {}
            var id = ++stamp
            var body = document.body.$base

            set[ id ] = function( event, e ) {
              var self = this
              body.on('$move',function( event, e ){
                self.emit( key, event, e )
              },id)

              body.on('$up',function(){
                body.off('$move',id)
                body.off('$up',id)
              },id)
            }

            parent.setKey('$down', set, ev)
            return Emitter.apply( this, arguments )
          }
        }
      }
    })
  }
}