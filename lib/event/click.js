'use strict'
var isNode = require('vigour-js/lib/util/is/node')
if (!isNode) {
  var Event = require('vigour-js/lib/event')
  var Emitter = require('./emitter')
  var doc = require('../document')

  const CLICK = 'click'
  const DOWN = 'down'
  const UP = 'up'

  doc.inject(require('../event/up'))
  exports.inject = require('./down')

  exports.on = {
    properties: {
      click: new Emitter({
        define: {
          generateConstructor: function () {
            return function DerivedEmitter (val, ev, parent, key) {
              parent.setKey(DOWN, {
                click (e, event) {
                  if (event.prevent) {
                    return
                  } else if (this.getNode()) {
                    let path = this.path
                    let eX = e.x
                    let eY = e.y
                    let keyx = path.join('.')
                    let engine = event.engine
                    doc.on(UP, function (e, docevent) {
                      // if (eX === e.x && eY === e.y) {
                      let rendered = engine.get(path)
                      rendered._on.click.execInternal(rendered, event, e)
                      engine.cleanContextPath(path)
                      // }
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
// }
}
