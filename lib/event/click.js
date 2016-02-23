'use strict'
var isNode = require('vigour-util/is/node') // use brify system for include (also possible in webpack)
if (!isNode) {
  var cases = require('../cases')
  var delegator = require('./delegator')
  var Event = require('vigour-event')
  var Emitter = require('vigour-observable/lib/emitter')
  const DOWN = 'down'
  const UP = cases.$touch.val ? 'touchend' : 'mouseup'

  exports.inject = require('./down')
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
                  currentTarget.addEventListener(UP, function click (e) {
                    if (!e.preventClick) {
                      var evt = new Event(key)
                      self.applyContext(store)
                      self._on.click.execInternal(self, evt, e)
                      evt.remove()
                    }
                    currentTarget.removeEventListener(UP, click)
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
