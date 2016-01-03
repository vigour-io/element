'use strict'
var isNode = require('vigour-js/lib/util/is/node')
if (!isNode) {
  var Base = require('vigour-js/lib/base')
  var Emitter = require('./emitter')
  var Event = require('vigour-js/lib/event')
  // Event.prototype.properties

  module.exports = new Emitter({
    properties: {
      type: new Base({
        inject: require('../cases/inject')
      })
    },
    define: {
      generateConstructor () {
        return function DerivedEmitter (val, ev, parent, key) {
          if (parent) {
            let type = this.type.val
            if (!type) {
              console.warn('No event type defined on', this.path)
              return
            }
            parent.setKey(type, {
              basic (e, event) {
                this.emit(key, void 0, event)
              }
            }, ev)
          }
          return Emitter.apply(this, arguments)
        }
      }
    }
  }).Constructor
}
