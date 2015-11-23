'use strict'

var Emitter = require('vigour-js/lib/emitter')

exports.inject = require('../'),
exports.on = {
  properties: {
    arrowUp: new Emitter({
      emitInstances: false,
      define: {
        generateConstructor () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey('keydown', {
              up (e, event) {
                if(e.keyCode === 38){
                  this.emit(key, e, event)
                }
              }
            }, ev)
            return Emitter.apply(this, arguments)
          }
        }
      }
    })
  }
}
