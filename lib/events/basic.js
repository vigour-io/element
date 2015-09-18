"use strict";

var Emitter = require( 'vjs/lib/emitter' )
var Observable = require( 'vjs/lib/observable' )

module.exports = new Emitter({
  $flags:{
    $type:Observable,
    $stamp:0
  },
  $define: {
    $instances: false,
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
      return (function DerivedEmitter( val, ev, parent, key ) {
        this.$clearContext() //is this nessecary??
        if(parent) {
          var set = {}
          var id = ++this.$stamp
          var type = this.$type.$val
          
          if(!type){
            console.error('No event type defined on', this.$path)
            return
          }

          console.error('??',type)
          set[ id ] = function( event, e ) {
            this.emit( key, event, e )
          }
          parent.setKey( type, set , ev)
        }
        return Emitter.apply( this, arguments )
      })
    }
  }
}).$Constructor