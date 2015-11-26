'use strict'

var platforms = require('./platforms')
var Emitter = require('../emitter')

exports.inject = require('../')

exports.on = {
  properties: {
    arrowDown: new Emitter({
      define: {
        generateConstructor () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey('keydown', {
              down (e, event) {
                if (platforms.down[e.keyCode]) {
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
