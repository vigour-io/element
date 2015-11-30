'use strict'

var BasicEventEmitter = require('./basic')

exports.inject = require('./')
exports.inject = require('./nav/enterdown')

exports.on = {
  properties: {
    down: new BasicEventEmitter({
      type: {
        val: 'mousedown',
        touch: 'touchstart'
      }
    })
  }
}
