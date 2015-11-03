'use strict'

var Emitter = require('vjs/lib/emitter')
var Observable = require('vjs/lib/observable')

module.exports = new Emitter({
  properties: {
    type: Observable
  },
  define: {
    stamp: {
      writable: true,
      value: 0
    },
    emitInstances: false,
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
    generateConstructor: function () {
      return function DerivedEmitter (val, ev, parent, key) {
        this.clearContext() // is this nessecary??
        if (parent) {
          var set = {}
          var id = ++this.stamp
          var type = this.type.val

          if (!type) {
            console.warn('No event type defined on', this.path)
            return
          }

          set[id] = function (e, event) {
            this.emit(key, e, event)
          }
          parent.setKey(type, set, ev)
        }
        return Emitter.apply(this, arguments)
      }
    }
  }
}).Constructor
