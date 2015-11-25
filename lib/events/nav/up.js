'use strict'

var Emitter = require('vigour-js/lib/emitter')
var platforms = require("./platforms")

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
                if(platforms.up[e.keyCode]) {
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
