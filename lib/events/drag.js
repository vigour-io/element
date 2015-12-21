'use strict'

var Emitter = require('./emitter')
var doc = require('../document')
var ID = 'drag'

doc.inject(
  require('../events/move'),
  require('../events/up')
)

exports.inject = require('../events/down')

exports.on = {
  properties: {
    drag: new Emitter({
      define: {
        generateConstructor () {
          return function DerivedEmitter (val, ev, parent, key) {
            parent.setKey('down', {
              drag (e, event) {
                this.emit('dragstart', e, event)
                doc.on('move', (e, event) => {
                  this.emit(key, e, event)
                }, ID)
                doc.on('up', () => {
                  this.emit('dragend', e)
                  doc.off('move', ID)
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
