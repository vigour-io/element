'use strict'

var BasicEventEmitter = require('./basic')

exports.inject = require('./')
exports.inject = require('./nav/enterup')


exports.on = {
  properties: {
    up: new BasicEventEmitter({
      type: {
        val: 'mouseup',
        touch: 'touchend'
      }
    })
  }
}
