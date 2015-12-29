'use strict'
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