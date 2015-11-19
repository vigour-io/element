'use strict'

var BasicEventEmitter = require('../basic')
var prefix = require('../../ua').prefix
exports.inject = require('../')

exports.on = {
  properties: {
    animationEnd: new BasicEventEmitter({
      type: `${prefix}AnimationEnd`
    })
  }
}
