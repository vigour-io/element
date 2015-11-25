'use strict'

var BasicEventEmitter = require('./basic')

exports.inject = require('./')

exports.on = {
  properties: {
    down: new BasicEventEmitter({
      type: {
        val: 'mousedown',
        $touch: 'touchstart'
      }
    })
  }
}
