'use strict'

var Element = require('../element')
var Observable = require('vigour-js/lib/Observable')

var properties = {
  src: {
    $type: 'string'
  },
  play: {
    $type: 'boolean'
  },
  time: {
    $type: { range: [ 0, 1 ] }
  },
  duration: {
    $type: 'number'
  },
  volume: {
    $type: { range: [ 0, 1 ] }
  }
}

var Player = new Element({
  ChildConstructor: new Observable({
    inject: require('vigour-js/lib/operator/type')
  }),
  inject: properties
})

module.exports = Player.Constructor
