/**
 * An **event** is an Emitter, the idea of this Object is give to the Elements class
 * the possibility to listen for elements events, like: click, drag, scroll etc.
 * @namespace Events
 */
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
    $focusin: basic,
    $click: require('./click'),
    $drag: require('./drag'),
    $scroll: require('./scroll')
  },
  $define: {
    $ChildConstructor: new Emitter( {
      $define: {
        /**
        * Use $noInstances:true to not update the object instances when the object change.
        * @type {bool}
        * @memberOf Events
        */
        $noInstances: true,
        $key: {
          set: function( val ) {
            var domEventCache = this.$domEventCache
            if( !domEventCache[ val ] ) {
              document.body.addEventListener( val, function( e ) {
                //TODO clean this up
                if(e.x === void 0){
                  e.x = e.pageX
                  e.y = e.pageY
                }


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
              },
              val === 'scroll' || void 0 )
              domEventCache[ val ] = true
            }
            this._$key = val
          },
          get: function( val ) {
            return this._$key
          }
        },
        $domEventCache: {
          value: {}
        }
      }
    } ).$Constructor
  }
}
/**
 * @function findTarget The function tries to discover the closest instance of $base on the Dom tree starting
 * from the own element
 * @memberOf Events
 * @param  {object} node The dom node for the element
 * @return {Object} target The target for the object on the Dom tree
 *
 * @example
 *
 * var a = new Element({
 * $css : "funLife",
 * elementA:{
 *   elementB:{
 *     $text:{
 *       $val:"I'm elementB"
 *     },
 *     $on:{
 *        $click:function (argument) {
 *          console.log("heyyy")
 *        }
 *     }
 *   }
 * }
 * })
 *
 * When elementB is clicked, the findTargetFunction will try to discover the correct target. This way
 * the event will be emited to the correct element.
 *
 */
function findTarget( node ){
  var target
  var path = []
  var i = -1
  while( !target ) {
    i++
    path.push( node.getAttribute('data-key') || node.className )
    node = node.parentNode
    target = node.$base
  }
  for( ; i >= 0; i-- ) {
    target = target[ path[ i ] ]
  }
  return target
}
