"use strict";

var Base = require( 'vjs/lib/base' )
var Emitter = require( 'vjs/lib/emitter' )
var Event = require( 'vjs/lib/event' )
var stamp = 0

exports.$on = {
  $define: {
    $ChildConstructor: new Emitter( {
      $define: {
        $noInstances: true,
        _$key: {
          set: function( val ) {

            //this is just for the nice!
            //TODO: make this pointer thing flexible
            var element = this._$parent._$parent
            var node = element.$node
            node.style.cursor = 'pointer'
            if( val.indexOf( 'drag' ) === 0 ) {
              node.setAttribute( 'draggable', true )
            }

            this.$newDomEvent( val )
            this.__$key = val
          },
          get: function( val ) {
            return this.__$key
          }
        },
        $domEventCache: {
          value: {}
        },
        $newDomEvent: function( val ) {
          var domEventCache = this.$domEventCache
          if( !domEventCache[ val ] ) {
            document.body.addEventListener( val, function( e ) {

              var node = e.target
              var target = node.$base
              var firstTarget
              var event
              var path
              var i

              if( !target ) {
                path = []
                i = -1
                while( !target ) {
                  i++
                  path.push( node.getAttribute( 'key' ) || node.className )
                  node = node.parentNode
                  target = node.$base
                }
                for( ; i >= 0; i-- ) {
                  target = target[ path[ i ] ]
                }
              }

              while( target ) {
                if( target.$on[ val ] ) {
                  if( !firstTarget ) {
                    firstTarget = target
                    event = new Event( target )
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
        }
      }
    } ).$Constructor
  }
}

exports.$inject = require( 'vjs/lib/methods/setWithPath' )

// exports.$flags = {
//   $domEvents: new Base()
// }

exports.$define = {
  $addEvent: function( type, fn, id ) {
    if( !id ) {
      id = stamp++
    }
    this.setWithPath( [ '$on', type, id ], fn )
    return id
  },
  $removeEvent: function( type, id ) {
    if( type ){
      this.off( type, id )
    } else {
      var _this = this
      this.$on.each(function( property ){
        _this.off(property.__$key, id )
      })
    }
  }
}
