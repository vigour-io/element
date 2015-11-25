'use strict'

var Emitter = require('vigour-js/lib/emitter')
var doc = require('../document')
var stamp = 0

doc.inject( require('../events/up') )

exports.inject = require('./down')
exports.on = {
  properties: {
    click: new Emitter({
      emitInstances: false,
      define: {
        generateConstructor: function () {
          return function DerivedEmitter (val, ev, parent, key) {
            // TODO don't expect body to have a base already in this point
            var set = {}
            var id = ++stamp + 'click'
            set[id] = function (e, event) {
              var _this = this
              doc.on('up', function (e, event) {
                _this.emit(key, e, event)
                doc.off('up', id)
              }, id)
            }

            parent.setKey('down', set, ev)
            return Emitter.apply(this, arguments)
          }
        }
      }
    })
  }
}
