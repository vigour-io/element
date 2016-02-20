'use strict'
var isNode = require('vigour-util/is/node')
if (!isNode) {
  var delegator = require('./delegator')
  var Event = require('vigour-js/lib/event')
  var Emitter = require('vigour-js/lib/emitter')
  var parseEvent = require('./util').parseEvent
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
                  var currentTarget = e.currentTarget
                  var store = this.storeContext()
                  var self = this
                  var dragmove = function dragmove (e) {
                    var evt = new Event(key)
                    self.applyContext(store)
                    e = parseEvent(e)
                    e.currentTarget = currentTarget
                    self._on.drag.execInternal(self, evt, e)
                    evt.remove()
                  }
                  var dragend = function dragend (e) {
                    var evt = new Event(key)
                    self.applyContext(store)
                    e = parseEvent(e)
                    e.currentTarget = currentTarget
                    self._on.drag.execInternal(self, evt, e)
                    if (self._on.dragend) {
                      self._on.dragend.execInternal(self, evt, e)
                    }
                    evt.remove()
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
