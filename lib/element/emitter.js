"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var Event = require( 'vjs/lib/event' )
var domEvents = {}

module.exports = new Emitter( {
  $noInstances:true,
  $define: {
    _$key: {
      set: function( val ) {
        this._$parent._$parent.$node.style.cursor = 'pointer'

        if( !domEvents[ val ] ) {
          document.body.addEventListener( val, function( e ) {
            var event
            var path
            var child = e.target
            var origChild = child
            var target = child.$base

            if( !target ) {
              path = []
              while( !target ) {
                path.push( child.className )
                child = child.parentNode
                target = child.$base
              }
              for( var i = path.length - 1; i >= 0; i-- ) {
                target = target[ path[ i ] ]
              }
            }

            target._$contextNode = origChild

            while( target ) {
              if( target.$on[ val ] ) {
                event = new Event( target )
                event.$domEvent = e
                target.$emit( val, event, e )
              }
              target = target._$parent
            }
          } )
          domEvents[ val ] = true
        }
        this.__$key = val
      },
      get: function( val ) {
        return this.__$key
      }
    }
  }
} ).$Constructor
