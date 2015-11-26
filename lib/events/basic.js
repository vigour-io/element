'use strict'

var Base = require('vigour-js/lib/base')
var Emitter = require('./emitter')

module.exports = new Emitter({
  properties: {
    type: new Base({
      inject: require('../cases/inject')
    })
  },
  define: {
    /**
     * This internal function gets called when a new Event is created.
     * The idea is use this function to generate the basic event that we need.
     * @function generateConstructor
     * @memberOf Event
     * @param {Object} val [The object(s)]
     * @param {event} ev [description]
     * @param {Object} parent [The parent element]
     * @param {string} key [The key name of the element]
     * @return {ObservableObject} [description]
     */
    generateConstructor () {
      return function DerivedEmitter (val, ev, parent, key) {
        this.clearContext() // is this nessecary??
        if (parent) {
          let type = this.type.val
          if (!type) {
            console.warn('No event type defined on', this.path)
            return
          }
          parent.setKey(type, {
            basic (e, event) {
              this.emit(key, e, event)
            }
          }, ev)
        }
        return Emitter.apply(this, arguments)
      }
    }
  }
}).Constructor
