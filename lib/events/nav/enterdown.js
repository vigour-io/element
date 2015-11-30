'use strict'

var BasicEventEmitter = require('../basic')

exports.inject = require('../')

exports.on = {
  properties: {
    enterDown: new BasicEventEmitter({
      type: {
        val: 'keydown'
      }
    })
  }
}
