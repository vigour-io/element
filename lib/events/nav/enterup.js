'use strict'

var BasicEventEmitter = require('../basic')

exports.inject = require('../')

exports.on = {
  properties: {
    enterUp: new BasicEventEmitter({
      type: {
        val: 'keyup'
      }
    })
  }
}
