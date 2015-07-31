"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var Event = require( 'vjs/lib/event' )
var Base = require( 'vjs/lib/base' )
  // var cases = require( '../cases' )
var ua = require( '../ua' )
var stamp = 0

console.info( 'platform:', ua.platform )
console.info( 'device:', ua.device )
console.info( 'browser:', ua.browser )
console.dir( ua )

// function returnFn( val ) {
//   if( typeof val !== 'function' ) {
//     for( var field in val ) {
//       val = val[ field ]
//     }
//   }
//   return val
// }

// function(){}
// {'anykey':function(){}}
var map
  // if(cases.touch){
  //   map = {
  //     $down: 'touchstart',
  //     $move: 'touchmove',
  //     $up: 'touchend'
  //   }
  // }else{
map = {
    $down: 'mousedown',
    $move: 'mousemove',
    $up: 'mouseup' //,
      // $dragstart: 'dragstart',
      // $dragend: 'dragend'
  }
  // }

var basicDomEmitter = new Emitter( {
  $define: {
    $generateConstructor: function() {
      return function DerivedEmitter( val, ev, parent, key ) {
        var set = {}
        var id = ++stamp
        
        set[ id ] = function( event, e ) {
          this.$emit( key, event, e )
        }

        parent.setKey( map[key], set , ev)
        return Emitter.apply( this, arguments )
      }
    }
  }
} )

exports.$on = {
  $flags: {
    $down: basicDomEmitter,
    $move: basicDomEmitter,
    $up: basicDomEmitter,
    $click: new Emitter( {
      $define: {
        $generateConstructor: function() {
          return function DerivedEmitter( val, ev, parent, key ) {
            var set = {}
            var id = ++stamp
            var app = document.body.$base
            
            set[ id ] = function( event, e ) {
              var _this = this
              app.on('$up',function( event, e ){
                _this.$emit( key, event, e )
                app.off('$up',id)
              },id)
            }

            parent.setKey( '$down', set, ev )
            return Emitter.apply( this, arguments )
          }
        }
      }
    } ),
    $drag: new Emitter( {
      $define: {
        $generateConstructor: function() {
          return function DerivedEmitter( val, ev, parent, key ) {
            var set = {}
            var id = ++stamp
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

            console.log('for renan!',set)

            parent.setKey( '$down', set, ev )
            return Emitter.apply( this, arguments )
          }
        }
      }
    } )
  },


  $define: {
    $ChildConstructor: new Emitter( {
      $define: {
        $noInstances: true,
        _$key: {
          set: function( val ) {
            this.$newDomEvent( val ) //val === 'mnousedonw'
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