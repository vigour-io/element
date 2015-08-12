"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var addListener = Emitter.prototype.$addListener
var ua = require('../ua')
var stamp = 0
var map

if(ua.device === 'phone' || ua.device === 'tablet'){
  map = {
    $down: 'touchstart',
    $move: 'touchmove',
    $up: 'touchend',
    $scroll: 'scroll',
    $focusin: 'focusin',
    $focusout:'focusout'
  }
}else{
  map = {
    $down: 'mousedown',
    $move: 'mousemove',
    $up: 'mouseup',
    $scroll: 'scroll',
    $focusin:'focusin',
    $focusout:'focusout',
  }
}

module.exports = exports = new Emitter( {
  $noInstances: true,
  $define: {
    /**
     * This internal function gets called when a new Event is created.
     * @function $generateConstructor
     * @memberOf Event
     * @param {Object} val [The object(s)]
     * @param {event} ev [description]
     * @param {Object} parent [The parent element]
     * @param {string} key [The key name of the element]
     * @return {ObservableObject} [description]
     */
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
/**
 * This internal function exports the mouseUp event, helpfull to create other events
 * @function up
 * @memberOf Event
 */
exports.up = new Emitter( {
  $noInstances: true,
  $define: {
    $addListener:function(val, key, unique, event) {
      var elem = this.$parent.$parent
      var type = map['$up']
      window.addEventListener(type,function up( e ) {
        elem.$emit( '$up', event, e )
        window.removeEventListener(type, up)
      },false)
      addListener.apply(this,arguments)
    }
  }
} )