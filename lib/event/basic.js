'use strict'

var Observable = require('vigour-js/lib/observable')
var Emitter = require('vigour-js/lib/emitter')

module.exports = new Emitter({
  properties: {
    type: new Observable({
      inject: require('../cases/inject')
    })
  },
  define: {
    generateConstructor () {
      return function DerivedEmitter (val, ev, parent, key) {
        if (parent) {
          let type = this.type.val
          parent.setKey(type, {
            basic (e, event) {
              if (this._input !== null) {
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

