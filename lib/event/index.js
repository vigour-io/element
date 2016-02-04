'use strict'
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
          let context = element.storeContext()
          properties['ev-' + key] = (ev) => {
            element.applyContext(context)
            var evt = new Event(key)
            element._on[key].execInternal(element, evt, ev)
            evt.remove()
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
