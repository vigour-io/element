'use strict'

var Emitter = require('./emitter')
var doc = require('../document')
var ID = 'click'

doc.inject(require('../events/up'))

exports.inject = require('./down')

exports.on = {
  properties: {
    click: new Emitter({
      define: {
        generateConstructor: function () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey('down', {
              click (e, event) {
                var _this = this
                doc.on('up', function (e, event) {
                  _this.emit(key, e, event)
                  doc.off('up', ID)
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
