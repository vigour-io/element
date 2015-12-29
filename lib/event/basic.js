'use strict'

var Event = require('vigour-js/lib/event')
var Base = require('vigour-js/lib/base')
var Emitter = require('./emitter')

module.exports = new Emitter({
  properties: {
    type: new Base({
      // inject: require('../cases/inject')
    })
  },
  define: {
    generateConstructor () {
      return function DerivedEmitter (val, ev, parent, key) {
        // this.clearContext() // is this nessecary??
        if (parent) {
          let type = this.type.val
          if (!type) {
            console.warn('No event type defined on', this.path)
            return
          }
          parent.setKey(type, {
            basic (e, event) {
              // TODO add event!
              this.emit(key, e)
            }
          }, ev)
        }
        return Emitter.apply(this, arguments)
      }
    }
  }
}).Constructor