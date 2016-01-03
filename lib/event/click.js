'use strict'
var isNode = require('vigour-js/lib/util/is/node')
if (!isNode) {
  var Emitter = require('./emitter')
  var doc = require('../document')
  const CLICK = 'click'
  // const DOWN = 'down'
  const UP = 'up'
  doc.inject(require('../event/up'))
  // exports.inject = require('./down')
  var Event = require('vigour-js/lib/event')

  exports.on = {
    properties: {
      click: new Emitter({
        define: {
          generateConstructor: function () {
            return function DerivedEmitter (val, ev, parent, key) {
              parent.setKey('mousedown', {
                click (e, event) {
                  console.log('click:mousedown')
                  if (event.prevent) {
                    return
                  } else if (this.getNode()) {
                    var path = this.path
                    var eX = e.x
                    var eY = e.y
                    var keyx = path.join('.')
                    var engine = event.engine
                    doc.on(UP, function (e, docevent) {
                      if (eX === e.x && eY === e.y) {
                        // ugh deze is faya
                        let rendered = engine.get(path)
                        let ev = new Event(CLICK)
                        rendered.emit(key, e, ev)
                        ev.trigger()
                        engine.cleanContextPath(path)
                      }
                      doc.off(UP, keyx)
                    }, keyx)
                  }
                }
              }, ev)
              return Emitter.apply(this, arguments)
            }
          }
        }
      })
    }
  }
// add clear context over path in vjs
// make paths super fast to use everywhere -- make it nice
// maybe just use a hash for it -- super short -- store them also use for everything else
}
