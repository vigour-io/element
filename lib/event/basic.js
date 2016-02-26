'use strict'
var Property = require('../property')
var Emitter = require('vigour-observable/lib/emitter')

module.exports = new Emitter({
  properties: {
    type: Property
  },
  define: {
    generateConstructor () {
      return function DerivedEmitter (val, ev, parent, key) {
        if (parent) {
          let type = this.type.val
          parent.setKey(type, {
            basic (e, event) {
              if (this.__input !== null) {
                this._on[key].execInternal(this, event, e)
              }
            }
          }, ev)
        }
        return Emitter.apply(this, arguments)
      }
    }
  }
}).Constructor

