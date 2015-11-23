'use strict'

var Emitter = require('vigour-js/lib/emitter')

exports.inject = require('../'),
exports.on = {
  properties: {
    arrowDown: new Emitter({
      emitInstances: false,
      define: {
        generateConstructor () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey('keydown', {
              down (e, event) {
                var platforms = {
                  "40":"defaultDown",
                  "0x28":"lgDown"
                }
                if(platforms[e.keyCode]) {
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
