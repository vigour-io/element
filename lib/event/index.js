'use strict'
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
          console.error('key:', val)
          this.parent.parent.setKey('hasEvents', true, false)
          const cache = this.eventCache
          if (!cache[val]) {
            cache[val] = true
            addListener(val)
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
