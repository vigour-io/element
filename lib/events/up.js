'use strict'

var BasicEventEmitter = require('./basic')

exports.inject = require('./')

exports.on = {
  properties: {
    up: new BasicEventEmitter({
      type: {
        val: 'mouseup',
        touch: 'touchend',
        test:'keyup'
      }
    })
  }
}
