'use strict'

var Emitter = require('vjs/lib/emitter')
var body = document.body.base
var stamp = 0

body.inject(require('./up'))

exports.inject = require('./down')
exports.on = {
  properties: {
    click: new Emitter({
      define: {
        emitInstances: false,
        generateConstructor: function () {
          return function DerivedEmitter (val, ev, parent, key) {
            console.error('down')
            var set = {}
            var id = ++stamp + 'click'
            set[id] = function (e, event) {
              var _this = this
              body.on('up', function (e, event) {
                _this.emit(key, e, event)
                body.off('up', id)
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
