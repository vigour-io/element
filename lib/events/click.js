"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var stamp = 0

module.exports =  new Emitter( {
  $define: {
    /**
    * Use $noInstances:true to not update the object instances when the object change.
    * @type {bool}
    * @memberOf Events
    */
    $noInstances: true,
    /**
     * This internal function gets called when a new Event is created.
     * @function $generateConstructor
     * @memberOf Event
     * @param {Object} val [The object(s)] ??? does it make sense? 
     * @param {event} ev [The Element that has fired the event]
     * @param {Object} parent [The parent element, the element that will have the eventvo]
     * @param {string} key [The key name of the element]
     * @return {function}
     */
    $generateConstructor: function() {
      return function DerivedEmitter( val, ev, parent, key ) {
        var set = {}
        var id = ++stamp + 'click'
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
} )