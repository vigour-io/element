"use strict";

var app = require( '../app' )

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
        parent.$addEvent( map[ key ], function( event, e ) {
          this.$emit( key, event, e )
        })
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
            parent.$addEvent( '$down', function( event, e ) {
              var id = ++stamp
              this.$addEvent( '$up', function( event, e ) {
                this.$emit( key, event, e )
                this.$removeEvent( false, id )
              }, id )
            } )
            return Emitter.apply( this, arguments )
          }
        }
      }
    } ),
    $drag: new Emitter( {
      $define: {
        $generateConstructor: function() {
          return function DerivedEmitter( val, ev, parent, key ) {
            parent.$addEvent( '$down', function( event, e ) {
              var id = ++stamp
              this.$addEvent( '$move', function( event, e ) {
                this.$emit( key, event, e )
              }, id )
              this.$addEvent( '$up', function() {
                this.$removeEvent( false, id )
              }, id )
            } )
            return Emitter.apply( this, arguments )
          }
        }
      }
    } ),
    $grab: new Emitter( {
      $define: {
        $generateConstructor: function() {
          return function DerivedEmitter( val, ev, parent, key ) {
            parent.$addEvent( '$down', function( event, e ) {
              var id = ++stamp
              this.$emit( '$grabstart', event, e )
              this.$addEvent( '$move', function( event, e ) {
                this.$emit( key, event, e )
              }, id )
              this.$addEvent( '$up', function( event, e ) {
                this.$emit( '$grabend', event, e )
                this.$removeEvent( false, id )
              }, id )
            } )
            return Emitter.apply( this, arguments )
          }
        }
      }
    } )
  },


  $define: {
    $addEvent: function( type, fn, id ) {
      if( !id ) {
        id = ++stamp
      }
      var set = {}
      set[ id ] = fn

      this.setKey( type, set )
      return id
    },
    $ChildConstructor: new Emitter( {
      $define: {
        $noInstances: true,
        _$key: {
          set: function( val ) {

            //this is just for the nice!
            //TODO: make this pointer thing flexible
            // var element = this._$parent._$parent
            // var node = element.$node
            // node.style.cursor = 'pointer'
            // if( val.indexOf( 'drag' ) === 0 ) {
            //   node.setAttribute( 'draggable', true )
            // }
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
                  // firstTarget.$text.$val = Math.random()
              }
            } )

            domEventCache[ val ] = true
          }
        }
      }
    } ).$Constructor
  }
}

// exports.$flags = {
//   $domEvents: new Base()
// }

exports.$define = {
  $addEvent: function( type, fn, id ) {
    return this.$on.$addEvent( type, fn, id )
  },
  $removeEvent: function( type, id ) {
    var _this = this
    var on = this.$on
    var domevent
    var key
    if( type ) {
      if( domevent = on[ type ] ) {
        //TODO: support $base and $passon
        if( domevent = domevent.$fn ){
          if( id ) {
            if( domevent[ id ] ) {
              this.off( type, id )
              // delete domevent[ id ]
            }
          } else {
            this.off( type )
            // domevent.remove()
          }
        }
      }
    } else {
      for( type in on ) {
        if( domevent = on[ type ] ) {
          if( key = domevent._$key ) {
            this.$removeEvent( key, id )
          }
        }
      }
    }
  }
}
