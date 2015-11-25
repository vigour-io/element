'use strict'

var Emitter = require('vigour-js/lib/emitter')
var platforms = require("./platforms")

exports.inject = require('../'),
exports.on = {
  properties: {
    arrowRight: new Emitter({
      emitInstances: false,
      define: {
        generateConstructor () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey('keydown', {
              right (e, event) {
                if(platforms.right[e.keyCode]) {
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
