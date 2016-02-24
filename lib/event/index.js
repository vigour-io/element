'use strict'
require('./delegator')
var Property = require('../property')
var Event = require('vigour-js/lib/event')

exports.properties = {
  domEvent: new Property({
    define: {
      compare () {} //if not dont do it
    },
    render () {}, // fix this should not be nessecary..
    Child: {
      define: {
        compare () {}, //if not dont do it
        dom: {
          get () {
            return this.key
          }
        }
      },
      render (val, properties, children, data, current, prev) {
        var key = this.key
        var element = this.parent.parent
        var state = current.state
        // NEEDS TO BE OPTMIZED DO OWN HANDLER STATE HAS TO BE FIRED, USE ONE LISTENER
        if (element._on && element._on[key]) {
          properties['ev-' + key] = (ev) => {
            element.apply(state)
            var evt = new Event(key)
            if (key === 'touchstart') {
              ev.startPropagation()
            }
            console.error('element:event:', key)
            element._on[key].execInternal(element, evt, ev)
            evt.trigger()
          }
        }
      }
    }
  })
}

// make the basic prop
exports.on = {
  Child: {
    define: {
      key: {
        set (val) {
          this.parent.parent.set({
            domEvent: { [val]: true }
          })
          this._key = val
        },
        get (val) {
          return this._key
        }
      }
    }
  }
}
