'use strict'

var Emitter = require('vjs/lib/emitter')
var stamp = 0

exports.inject = require('./down')
exports.on = {
  properties: {
    click: new Emitter({
      define: {
        emitInstances: false,
        generateConstructor: function () {
          return function DerivedEmitter (val, ev, parent, key) {
            // TODO don't expect body to have a base already in this point
            var body = document.body.base
            var stamp = 0

            body.inject(require('./up'))

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
