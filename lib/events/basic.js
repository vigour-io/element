"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var addListener = Emitter.prototype.$addListener
var stamp = 0

var map = {
  $down: 'mousedown',
  $move: 'mousemove',
  $up: 'mouseup',
  $scroll: 'scroll'
}

module.exports = exports = new Emitter( {
  $noInstances: true,
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

exports.up = new Emitter( {
  $define: {
    $addListener:function(val, key, unique, event){
      var elem = this._$parent._$parent
      var type = map['$up']
      window.addEventListener(type,function up( e ){
        elem.$emit( '$up', event, e )
        window.removeEventListener(type, up)
      },false)
      addListener.apply(this,arguments)
    }
  }
} )