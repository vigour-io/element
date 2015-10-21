'use strict'

var Emitter = require('vjs/lib/emitter')
var stamp = 0

exports.on = {
  properties: {
    drag: new Emitter({
      define: {
        emitInstances: false,
        generateConstructor () {
          return function DerivedEmitter (val, ev, parent, key) {
            var set = {}
            var id = ++stamp
            var body = document.body.base

            set[id] = function (e, event) {
              body.on('move', (e, event) => this.emit(key, e, event), id)
              body.on('up', () => {
                body.off('move', id)
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
