'use strict'
var ua = require('../ua')
if (ua.platform === 'ios') {
  let delegator = require('./delegator')
  let Emitter = require('vigour-observable/lib/emitter')
  let Event = require('vigour-event')

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

                  delegator.addGlobalEventListener('scroll', removeListeners, true)
                  delegator.addEventListener(node, 'touchend', clickend)

                  function clickend (e) {
                    let evt = new Event(key)
                    self.applyContext(store)
                    self._on.click.execInternal(self, evt, e)
                    evt.remove()
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