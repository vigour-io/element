'use strict'
const delegateEvent = require('./delegate')
const addListener = require('./listener')
const remove = require('vigour-observable').prototype.remove

exports.properties = {
  hasEvents: true
}

exports.on = {
  property (val) {
    if (this.__c) {
      throw new Error('got context when creating an event were not handeling this yet')
    }
    this._parent.hasEvents = true
    const cache = this.eventCache
    if (!cache[val]) {
      cache[val] = true
      addListener(val, (e) => delegateEvent(val, e))
    }
  },
  define: {
    eventCache: { value: {} },
    remove () {
      if (this._parent && this._parent.val !== null) {
        console.error('ooo dangermouse removing events did not test yet')
        this._parent.hasEvents = null
      }
      return remove.apply(this, arguments)
    }
  }
}
