'use strict'
var isTouch = require('vigour-util/is/touch')
if (isTouch) {
  let delegator = require('./delegator')
  let Emitter = require('vigour-observable/lib/emitter')
  let Event = require('vigour-event')
  let margin = 10
  let close = function (a, b) {
    return a >= b - margin && a <= b + margin
  }
  delegator.listenTo('scroll')

  exports.on = {
    properties: {
      click: new Emitter({
        define: {
          generateConstructor: function () {
            return function DerivedEmitter (val, ev, parent, key) {
              parent.setKey('touchstart', {
                click (e, event) {
                  var store = this.storeContext()
                  var node = e.currentTarget
                  var self = this
                  var eX = e.x
                  var eY = e.y

                  delegator.addGlobalEventListener('scroll', removeListeners, true)
                  delegator.addEventListener(node, 'touchend', clickend)

                  function clickend (e) {
                    if (close(e.x, eX) && close(e.y, eY)) {
                      let evt = new Event(key)
                      self.applyContext(store)
                      self._on.click.execInternal(self, evt, e)
                      evt.remove()
                    }
                    removeListeners()
                  }

                  function removeListeners () {
                    delegator.removeEventListener(node, 'touchend', clickend)
                    delegator.removeGlobalEventListener('scroll', removeListeners)
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
}
