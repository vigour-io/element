'use strict'

var Emitter = require('./emitter')
var doc = require('../document')
const ID = 'click'
const DOWN = 'down'
const UP = 'up'

doc.inject(require('../events/up'))

exports.inject = require('./down')

exports.on = {
  properties: {
    click: new Emitter({
      define: {
        generateConstructor: function () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey(DOWN, {
              click (e, event) {
                var _this = this
                doc.on(UP, function (e, event) {
                  _this.emit(key, e, event)
                  doc.off(UP, ID)
                }, ID)
              }
            }, ev)
            return Emitter.apply(this, arguments)
          }
        }
      }
    })
  }
}