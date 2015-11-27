'use strict'

var Emitter = require('vigour-js/lib/emitter')
var platforms = require("./platforms")

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
                if(platforms.down[e.keyCode]) {
                  platforms.findElement(this, 'next')
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