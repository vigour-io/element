'use strict'
const addListener = require('./listener')
const vstamp = require('vigour-stamp')

exports.properties = {
  hasEvents: true
}

exports.on = {
  Child: {
    define: {
      eventCache: {
        value: {}
      },
      key: {
        set (val) {
          this.parent.parent.setKey('hasEvents', true, false)
          const cache = this.eventCache
          if (!cache[val]) {
            cache[val] = true
            addListener(val, (e) => delegateEvent(val, e))
          }
          this._key = val
        },
        get (val) {
          return this._key
        }
      }
    }
  }
}

function delegateEvent (key, e) {
  var target = e.target
  var stamp
  do {
    let elem = target._
    if (elem) {
      let listener = elem.__on[key]
      if (listener) {
        if (!stamp) {
          stamp = vstamp.create(key)
        }
        listener.emit(elem, stamp, {
          event: e,
          target: target,
          state: target._s
        })
      }
    }
  } while ((target = target.parentNode))
  if (stamp) {
    vstamp.close(stamp)
  }
}
