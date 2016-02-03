'use strict'
var isNode = require('vigour-js/lib/util/is/node')
if (!isNode) {
  var delegator = require('./delegator')
  var Emitter = require('vigour-js/lib/emitter')
  var cases = require('../cases')

  const DOWN = 'down'
  const UP = cases.$touch.val ? 'touchend' : 'mouseup'

  exports.inject = require('./down')
  console.error(UP)
  delegator.listenTo(UP)

  exports.on = {
    properties: {
      click: new Emitter({
        define: {
          generateConstructor: function () {
            return function DerivedEmitter (val, ev, parent, key) {
              parent.setKey(DOWN, {
                click (e, event) {
                  var currentTarget = e.currentTarget
                  var store = this.storeContext()
                  var self = this
                  delegator.addGlobalEventListener(UP, function click (e) {
                    var path = e._rawEvent.path
                    for (var i = 0, l = path.length; i < l; i++) {
                      if (path[i] === currentTarget) {
                        self.applyContext(store)
                        self._on.click.execInternal(self, event, e)
                        break
                      }
                    }
                    delegator.removeGlobalEventListener(UP, click)
                  })
                }
              }, ev)
              return Emitter.apply(this, arguments)
            }
          }
        }
      })
    }
  }
}
