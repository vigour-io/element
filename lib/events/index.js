"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var Event = require( 'vjs/lib/event' )
var Base = require( 'vjs/lib/base' )
var ua = require( '../ua' )
var basic = require('./basic')

exports.$on = {
  $flags: {
    $down: basic,
    $move: basic,
    $up: basic.up,
    $click: require('./click'),
    $drag: require('./drag')
  },
  $define: {
    $ChildConstructor: new Emitter( {
      $define: {
        $noInstances: true,
        _$key: {
          set: function( val ) {
            var domEventCache = this.$domEventCache
            if( !domEventCache[ val ] ) {
              document.body.addEventListener( val, function( e ) {
                var node = e.target
                var target = node.$base || findTarget( node )
                var firstTarget
                var event

                while( target ) {
                  if( target.$on[ val ] ) {
                    if( !firstTarget ) {
                      firstTarget = target
                      event = new Event( target, val )
                    } else {
                      target.$emit( val, event, e )
                    }
                  }
                  target = target._$parent
                }
                if( firstTarget ) {
                  firstTarget.$emit( val, event, e )
                }
              } )

              domEventCache[ val ] = true
            }

            this.__$key = val
          },
          get: function( val ) {
            return this.__$key
          }
        },
        $domEventCache: {
          value: {}
        }
      }
    } ).$Constructor
  }
}

function findTarget( node ){
  var target
  var path = []
  var i = -1
  while( !target ) {
    i++
    console.log('node!',node)
    path.push( node.getAttribute( 'key' ) || node.className )
    node = node.parentNode
    target = node.$base
  }
  for( ; i >= 0; i-- ) {
    target = target[ path[ i ] ]
  }
  return target
}
