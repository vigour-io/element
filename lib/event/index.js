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
        if (element._on && element._on[key]) {
          properties['ev-' + key] = (ev) => {
            console.clear()
            element.apply(state)
            console.log('YOYOYOYO', element)
            var evt = new Event(key)
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
