'use strict'

var platforms = require('./platforms')
var Emitter = require('../emitter')

exports.inject = require('../')

exports.on = {
  properties: {
    arrowRight: new Emitter({
      define: {
        generateConstructor () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey('keydown', {
              right (e, event) {
                if (platforms.right[e.keyCode]) {
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
