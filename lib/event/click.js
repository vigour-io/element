'use strict'

var Emitter = require('./emitter')
var doc = require('../document')
const CLICK = 'click'
const DOWN = 'down'
const UP = 'up'

doc.inject(require('../event/up'))
exports.inject = require('./down')

var globals = require('../engine/dom/globals')

exports.on = {
  properties: {
    click: new Emitter({
      define: {
        generateConstructor: function () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey(DOWN, {
              click (e, event) {
                var path = this.path
                var _this = this
                var eX = e.x
                var eY = e.y
                doc.on(UP, function (e, event) {
                  if (eX === e.x && eY === e.y) {
                    var _this = globals.app.get(path)
                    _this.emit(key, e, event)
                  }
                  // also dangerous
                  doc.off(UP, CLICK)
                }, CLICK)
              }
            }, ev)
            return Emitter.apply(this, arguments)
          }
        }
      }
    })
  }
}
