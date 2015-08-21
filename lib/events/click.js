"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var stamp = 0

module.exports = new Emitter({
  $define: {
    $instances: false,
    $generateConstructor: function() {
      return function DerivedEmitter( val, ev, parent, key ) {
        var set = {}
        var id = ++stamp + 'click'
        var app = document.body.$base

        set[ id ] = function( event, e ) {
          var _this = this
          app.on('$up',function( event, e ){
            _this.emit( key, event, e )
            app.off('$up',id)
          },id)
        }

        parent.setKey('$down', set, ev)
        return Emitter.apply( this, arguments )
      }
    }
  }
})