'use strict'
var isNode = require('vigour-js/lib/util/is/node')
if (!isNode) {
  var delegator = require('./delegator')
  var Emitter = require('vigour-js/lib/emitter')
  var cases = require('../cases')
  var isTouch = cases.$touch.val

  var DOWN = 'down'
  var MOVE = isTouch ? 'touchmove' : 'mousemove'
  var UP = isTouch ? 'touchend' : 'mouseup'

  delegator.listenTo(MOVE)

  exports.inject = require('./down')

  exports.on = {
    properties: {
      drag: new Emitter({
        define: {
          generateConstructor: function () {
            return function DerivedEmitter (val, ev, parent, key) {
              parent.setKey(DOWN, {
                drag (e, event) {
                  var store = this.storeContext()
                  var self = this
                  var dragmove = function dragmove (e) {
                    self.applyContext(store)
                    self._on.drag.execInternal(self, event, e)
                  }
                  var dragend = function dragend (e) {
                    self.applyContext(store)
                    self._on.drag.execInternal(self, event, e)
                    if (self._on.dragend) {
                      self._on.dragend.execInternal(self, event, e)
                    }
                    delegator.removeGlobalEventListener(MOVE, dragmove)
                    delegator.removeGlobalEventListener(UP, dragend)
                  }
                  delegator.addGlobalEventListener(MOVE, dragmove)
                  delegator.addGlobalEventListener(UP, dragend)
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
