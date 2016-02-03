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
          let context = element.storeContext()
          properties['ev-' + key] = (ev) => {
            console.clear()
            // element = this.parent.parent
            element.applyContext(context)
            console.log('ok im applying but is it ok?', context)
            console.log('prob need to set all context keys and shit as well')
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
