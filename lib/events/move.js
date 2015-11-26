'use strict'

var BasicEventEmitter = require('./basic')

exports.inject = require('./')

exports.on = {
  properties: {
    move: new BasicEventEmitter({
      type: {
        val: 'mousemove',
        $touch: 'touchmove'
      }
    })
  }
}
