'use strict'
const delegateEvent = require('./delegate')
const addListener = require('./listener')

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
          // dangerous for context!
          this._parent._parent.setKey('hasEvents', true, false)
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
