'use strict'

var Emitter = require('vigour-js/lib/emitter')
var platforms = require("./platforms")

exports.inject = require('../'),
exports.on = {
  properties: {
    arrowLeft: new Emitter({
      emitInstances: false,
      define: {
        generateConstructor () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey('keydown', {
              left (e, event) {
                if(platforms.left[e.keyCode]) {
                  platforms.findElement(this, 'previous')
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