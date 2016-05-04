'use strict'
const map = require('./map')
const properties = {}

exports.inject = require('../')

exports.on = {
  components: {
    keyemitter: {
      define: {
        key: {
          set (val) {
            const parent = this._parent
            const keydown = parent.keydown
            const listener = keydown && keydown.fn && keydown.fn.emitKey
            if (!listener) {
              parent.setKey('keydown', { emitKey }, false)
            }
            this._key = val
          },
          get (val) {
            return this._key
          }
        }
      }
    }
  },
  properties: properties
}

for (let i in map) {
  const type = map[i]
  if (!properties[type]) {
    properties[type] = { type: 'keyemitter' }
  }
}

function emitKey (data, stamp) {
  const keyCode = data.event.keyCode
  const type = map[keyCode]
  if (type) {
    const listener = this.__on[type]
    if (listener) {
      listener.emit(this, stamp, data)
    }
  }
}
