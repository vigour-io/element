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
    $keydown:'keydown',
    $keyup:'keyup',
    $keypress:'touchpress',
    $submit:'submit',
  }
}else{
  map = {
    $down: 'mousedown',
    $move: 'mousemove',
    $up: 'mouseup',
    $scroll: 'scroll',
    $keydown:'keydown',
    $keyup:'keyup',
    $keypress:'keypress',
    $submit:'submit',
  }
}

module.exports = exports = new Emitter( {
  $noInstances: true,
  $define: {
    /**
     * This internal function gets called when a new Event is created.
     * The idea is use this function to generate the basic event that we need.
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
        if(e.x === void 0){
          var touch = e.changedTouches[0]
          e.x = touch.pageX
          e.y = touch.pageY
        }
        elem.$emit( '$up', event, e )
        window.removeEventListener(type, up)
      },false)
      addListener.apply(this,arguments)
    }
  }
} )
