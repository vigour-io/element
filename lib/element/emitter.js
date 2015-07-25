"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var Event = require( 'vjs/lib/event' )
var domEvents = {}

module.exports = new Emitter( {
  $define: {
    $noInstances: true,
    _$key: {
      set: function( val ) { //click
        this._$parent._$parent.$node.style.cursor = 'pointer'

        if( !domEvents[ val ] ) {

          document.body.addEventListener( val, function( e ) {
            var event
            var path = []
            var child = e.target
            var target = child.$base

            while( !target ) {
              path.push( child.id )
              child = child.parentNode
              target = child.$base
            }

            for( var i = path.length - 1; i >= 0; i-- ) {
              target = target[ path[ i ] ]
            }

            while( target ) {
              if( e.$prevent ) {
                e.$prevent = null
                break
              }
              if( target.$on[ val ] ) {
                event = new Event( target )
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
