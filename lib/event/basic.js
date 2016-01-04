'use strict'
var isNode = require('vigour-js/lib/util/is/node')
if (!isNode) {
  var Base = require('vigour-js/lib/base')
  var Emitter = require('./emitter')

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
                if (this._input !== null) {
                  this._on[key].execInternal(this, event, e)
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
