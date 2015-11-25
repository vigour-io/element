'use strict'

var platforms = require('./platforms')
var Emitter = require('../emitter')

exports.inject = require('../')

exports.on = {
  properties: {
    arrowLeft: new Emitter({
      define: {
        generateConstructor () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey('keydown', {
              left (e, event) {
                if (platforms.left[e.keyCode]) {
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
