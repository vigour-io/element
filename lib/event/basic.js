'use strict'
var isNode = require('vigour-js/lib/util/is/node')
if (!isNode) {
  var Base = require('vigour-js/lib/base')
  var Emitter = require('./emitter')
  var Event = require('vigour-js/lib/event')

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
                if (event.prevent) {
                  return
                } else {
                  var engine = event.engine
                  event = new Event(key)
                  event.engine = engine
                  this.emit(key, e, event)
                  event.trigger()
                }
              }
            }, ev)
          }
          return Emitter.apply(this, arguments)
        }
      }
    }
  }).Constructor
}
