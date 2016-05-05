'use strict'
const delegateEvent = require('./delegate')
const addListener = require('./listener')
const proto = require('vigour-base').prototype
const addNewProperty = proto.addNewProperty
const remove = proto.remove

exports.properties = {
  hasEvents: true
}

exports.on = {
  property (key) {
    if (this.__c) {
      throw new Error('got context when creating an event were not handeling this yet')
    }
    this._parent.hasEvents = true
    const cache = this.eventCache
    if (!cache[key]) {
      cache[key] = true
      addListener(key, (e) => delegateEvent(key, e))
    }
  },
  define: {
    eventCache: { value: {} },
    // this is not enough when specific events get removed
    // maybe move to Child?
    remove () {
      if (this._parent && this._parent.val !== null) {
        console.error('ooo dangermouse removing events did not test yet')
        this._parent.hasEvents = null
      }
      return remove.apply(this, arguments)
    },
    addNewProperty (key, val) {
      const ret = addNewProperty.apply(this, arguments)
      if (val.createEvent) {
        this[key].createEvent()
      }
      return ret
    }
  },
  Child: {
    properties: {
      createEvent (createEvent) {
        this.define({ createEvent })
      }
    }
  }
}
