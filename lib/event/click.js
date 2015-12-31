'use strict'

var Emitter = require('./emitter')
var doc = require('../document')
const CLICK = 'click'
const DOWN = 'down'
const UP = 'up'
doc.inject(require('../event/up'))
// exports.inject = require('./down')

var Event = require('vigour-js/lib/event')
var globals = require('../engine/dom/globals')

exports.on = {
  properties: {
    click: new Emitter({
      define: {
        generateConstructor: function () {
          return function DerivedEmitter (val, ev, parent, key) {
            var em = Emitter.apply(this, arguments)
            parent.setKey('mousedown', {
              click (e, event) {
                if (this.getNode()) {
                  // should behave exactly the same!!!! godammnit
                  var path = this.path
                  var eX = e.x
                  var eY = e.y
                  var keyx = path.join('.')
                  doc.on(UP, function (e, docevent) {
                    if (eX === e.x && eY === e.y) {
                      let rendered = globals.app.getRendered(path)
                      // should have context!
                      var ev = new Event('click')
                      rendered[0].emit(key, e, ev)
                      ev.trigger()
                    }
                    for (let i = 0, length = path.length, walk = globals.app; i < length; i++) {
                      let lwalk = walk
                      walk = walk['_' + path[i]] || walk[path[i]]
                      lwalk.clearContext()
                    }
                    doc.off(UP, keyx)
                  }, keyx)
                }
              }
            }, ev)
            return em
          }
        }
      }
    })
  }
}
