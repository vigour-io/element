'use strict'
var doc = require('./delegator')
var Property = require('../property')
var Event = require('vigour-js/lib/event')
exports.properties = {
  domEvent: new Property({
    render () {}, // fix this should not be nessecary..
    Child: {
      render (val, properties) {
        var key = this.key
        var element = this.parent.parent
        if (element._on && element._on[key]) {
          let c = element._context
          let context = element.storeContext()
          let contextkey
          if (context) {
            contextkey = element._contextKey
          }
          properties['ev-' + key] = (ev) => {
            // element = this.parent.parent
            element.applyContext(context)
            if (contextkey) {
              element._contextKey = contextkey
            }
            var evt = new Event(key)
            // pretty hacky byt ok for now i geuss
            element._on[key].execInternal(element, evt, ev)
            evt.remove()
          }
        }
      }
    }
  })
}

// mae the basic prop

exports.on = {
  Child: {
    define: {
      key: {
        set (val) {
          this.parent.parent.set({
            domEvent: {
              [val]: true
            }
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
