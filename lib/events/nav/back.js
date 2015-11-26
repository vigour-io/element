'use strict'

var Emitter = require('vigour-js/lib/emitter')
var platforms = require("./platforms")

exports.inject = require('../'),
exports.on = {
  properties: {
    backButton: new Emitter({
      emitInstances: false,
      define: {
        generateConstructor () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey('keydown', {
              back (e, event) {
                if(platforms.back[e.keyCode]) {
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
