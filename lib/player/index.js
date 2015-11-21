'use strict'

var Element = require('../element')
var Observable = require('vigour-js/lib/Observable')

var properties = {
  src: {},
  play: {},
  time: {},
  duration: {},
  volume: {}
}

var Player = new Element({
  ChildConstructor: Observable,
  inject: properties
})

module.exports = Player.Constructor
