'use strict'
var isNode = require('vigour-util/is/node') // use brify system for include (also possible in webpack)
if (!isNode) {
  var delegator = require('./delegator')
  var Event = require('vigour-event')
  var Emitter = require('vigour-observable/lib/emitter')
  var interval

  exports.on = {
    properties: {
      over: new Emitter({
        define: {
          generateConstructor: function () {
            return function DerivedEmitter (val, ev, parent, key) {
              parent.setKey('mousemove', {
                over (e, event) {
                  var currentTarget = e.currentTarget
                  var store = this.storeContext()
                  var self = this
                  if (interval) {
                    clearInterval(interval)
                    interval = null
                  } else {
                    delegator.addGlobalEventListener('mousemove', function over (e) {
                      if (!~e._rawEvent.path.indexOf(currentTarget)) {
                        delegator.removeGlobalEventListener('mousemove', over)
                        clearInterval(interval)
                        interval = null
                      }
                    })
                  }
                  interval = setInterval(function () {
                    var evt = new Event(key)
                    self.applyContext(store)
                    self._on.over.execInternal(self, evt, e)
                    evt.remove()
                  }, 1000 / 60)
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
