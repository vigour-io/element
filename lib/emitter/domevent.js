"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var Event = require( 'vjs/lib/event' )

module.exports = new Emitter( {
  $define: {
    $noInstances: true,
    _$key: {
      set: function( val ) {

        // console.log('xxxx', val, this.$path)
        //TODO: make this pointer thing flexible
        // this._$parent._$parent.$node.style.cursor = 'pointer'

        this.$domEvent( val )
        this.__$key = val
      },
      get: function( val ) {
        return this.__$key
      }
    },
    $domEventCache: {
      value: {}
    },
    $domEvent: function( val ) {
      if( !this.$domEventCache[ val ] ) {
        document.body.addEventListener( val, function( e ) {
          var child = e.target
          var target = child.$base
          var event
          var path
          var i

          console.log('ghello')

          if( !target ) {
            path = []
            i = -1
            while( !target ) {
              i++
              // path.push( child.className )
              path.push( child.getAttribute('key') )
              child = child.parentNode
              target = child.$base
            }
            for( ;i >= 0; i-- ) {
              target = target[ path[ i ] ]
            }
          }


          var emitTarget

          while( target ) {
            if( target.$on[ val ] ) {
              if( !event ) {
                event = new Event( target )
                emitTarget = target

                // event.$block = true
                // emitTarget.$emit( val, event, e )
                // event.$block = null
              } else {
                target.$emit( val, event, e )
              }
            
              // if( event.$prevent ) {
              //   break
              // }
            }
            target = target._$parent
          }
        
          if(emitTarget) {
            emitTarget.$emit( val, event, e )
          }

        } )
        this.$domEventCache[ val ] = true
      }
    }
  }
} ).$Constructor
